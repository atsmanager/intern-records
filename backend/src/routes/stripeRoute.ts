import { Router, Request, Response } from "express";
import Stripe from "stripe";

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
  const { planId } = req.body as { planId: string };

  if (!planId || !PLANS[planId]) {
    return res.status(400).json({ error: "Invalid plan ID. Must be 'basic', 'professional', or 'premium'." });
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

// GET /api/stripe/session/:sessionId — verify payment after success redirect
router.get("/session/:sessionId", async (req: Request, res: Response) => {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    return res.json({
      status: session.payment_status,
      customerEmail: session.customer_details?.email,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (error: any) {
    console.error("Stripe session verify error:", error.message);
    return res.status(500).json({ error: "Unable to verify session." });
  }
});

export default router;
