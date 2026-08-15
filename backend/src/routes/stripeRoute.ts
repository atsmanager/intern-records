import { Router, Request, Response } from "express";
import Stripe from "stripe";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import Admin from "../models/admin";

const router = Router();

// Stripe is initialized lazily so the server starts even without a key configured
const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.startsWith("sk_test_REPLACE")) {
    throw new Error("Stripe secret key not configured. Set STRIPE_SECRET_KEY in your backend .env file.");
  }
  return new Stripe(key);
};

// Plan definitions — amounts are in cents (USD)
const PLANS: Record<string, { name: string; price: number; mode: "payment" | "subscription" }> = {
  basic: {
    name: "Basic ATS — One-Time License",
    price: 20000, // $200.00
    mode: "payment",
  },
  professional: {
    name: "Professional — Managed ATS (Annual)",
    price: 5000, // $50.00
    mode: "payment", // use "subscription" + a Stripe Price ID for true recurring billing
  },
  premium: {
    name: "Premium — Complete Recruitment",
    price: 0, // Custom — handled via Contact Sales / support page
    mode: "payment",
  },
};

// POST /api/stripe/create-checkout-session
router.post("/create-checkout-session", async (req: Request, res: Response) => {
  const { planId, fullName, email, company, password } = req.body;

  if (!planId || !PLANS[planId]) {
    return res.status(400).json({ error: "Invalid plan ID." });
  }

  const plan = PLANS[planId];

  if (plan.price === 0) {
    return res.status(400).json({ error: "Premium plan requires custom pricing. Please contact sales." });
  }

  try {
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: plan.mode,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plan.name,
              description: "Centennial Infotech ATS Service",
            },
            unit_amount: plan.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        fullName: fullName || "",
        email: email ? email.toLowerCase().trim() : "",
        company: company || "",
        passwordHash: password ? await bcryptjs.hash(password, 10) : "",
        planId: planId
      },
      billing_address_collection: "auto",
      success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/pricing`,
    });

    return res.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error.message);
    return res.status(500).json({ error: error.message || "Unable to create checkout session." });
  }
});

// GET /api/stripe/session/:sessionId — verify payment and provision account
router.get("/session/:sessionId", async (req: Request, res: Response) => {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId as string);
    
    // Provision user account if paid
    if (session.payment_status === 'paid' && session.metadata?.email) {
      const email = session.metadata.email;
      const existingUser = await Admin.findOne({ email });
      if (!existingUser && session.metadata.passwordHash) {
        
        // Calculate dates
        const planId = session.metadata.planId || 'basic';
        const paymentDate = new Date();
        const validityDate = new Date();
        if (planId === 'professional') {
          validityDate.setFullYear(validityDate.getFullYear() + 1); // 1 year
        } else {
          validityDate.setFullYear(validityDate.getFullYear() + 100); // 100 years for basic
        }

        const admin = new Admin({
          username: session.metadata.fullName || "User",
          email: email,
          passwordHash: session.metadata.passwordHash,
          company: session.metadata.company || "",
          planId,
          paymentDate,
          validityDate
        });
        await admin.save();

        // Send confirmation email
        try {
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: { user: process.env.SENDERMAIL, pass: process.env.MAILPASSWORD },
            tls: { rejectUnauthorized: false }
          });
          
          await transporter.sendMail({
            from: `"Centennial Infotech" <${process.env.SENDERMAIL}>`,
            replyTo: process.env.SENDERMAIL,
            to: email,
            subject: "Payment Successful - ATS License Activated",
            html: `
              <div style="font-family: sans-serif; padding: 20px;">
                <h2 style="color: #4f8ef7;">Welcome to Centennial Infotech ATS!</h2>
                <p>Your payment for the <strong>${planId.toUpperCase()}</strong> plan was successful.</p>
                <p>You can now log in using this email address and the password you created during checkout.</p>
                <p><strong>Payment Date:</strong> ${paymentDate.toLocaleDateString()}</p>
                <p><strong>Validity Until:</strong> ${planId === 'professional' ? validityDate.toLocaleDateString() : 'Lifetime Access'}</p>
                <br />
                <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}" style="background:#4f8ef7;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;">Go to Dashboard</a>
              </div>
            `
          });
          console.log(`[EMAIL] Payment confirmation sent to ${email}`);
        } catch (mailError) {
          console.error("Payment confirmation email failed:", mailError);
        }
      }
    }

    return res.json({
      status: session.payment_status,
      customerEmail: session.customer_details?.email || session.metadata?.email,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (error: any) {
    console.error("Stripe session verify error:", error.message);
    return res.status(500).json({ error: "Unable to verify session." });
  }
});

export default router;
