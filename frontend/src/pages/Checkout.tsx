import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

// Publishable key — safe to be in the frontend
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_REPLACE_WITH_YOUR_PUBLISHABLE_KEY'
);

// Map plan names to backend planId strings
const PLAN_ID_MAP: Record<string, string> = {
  'Basic Plan': 'basic',
  'Professional Plan': 'professional',
  'Premium Plan': 'premium',
};

const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [coupon, setCoupon] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'paypal'>('card');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const plan = location.state || {
    name: 'Basic Plan',
    price: '$200',
    billing: 'One Time',
    interval: 'one time',
    features: [
      'ATS Installation',
      'Client-Owned Website/Server',
      'Job Posting',
      'Candidate Management',
      'Applicant Tracking',
      'Recruitment Dashboard',
      'Basic Support',
    ],
  };

  const billingLabel =
    plan.billing ||
    (plan.interval === 'one time'
      ? 'One Time'
      : plan.interval === '/ annually'
      ? 'Annually'
      : plan.interval || 'One Time');

  const isPremium = plan.name === 'Premium Plan';

  const handleProceedToPayment = async () => {
    if (!agreed) return;
    setError('');

    if (!fullName || !email || !company || !password) {
      setError('Please fill in all required fields (Name, Email, Company, Password).');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (isPremium) {
      navigate('/support');
      return;
    }

    const planId = PLAN_ID_MAP[plan.name] || 'basic';

    setLoading(true);
    try {
      const response = await fetch(`${VITE_API_URL}/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, fullName, email, company, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session.');
      }

      // Redirect to Stripe-hosted Checkout using the session URL
      if (!data.url) {
        throw new Error('No checkout URL returned from server.');
      }
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '14px 16px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    marginBottom: '12px',
    fontFamily: 'inherit',
  };

  const paymentOptions: { id: 'card' | 'upi' | 'paypal'; label: string }[] = [
    { id: 'card', label: '💳  Credit / Debit Card' },
    { id: 'upi', label: '🇮🇳  UPI / Razorpay' },
    { id: 'paypal', label: '🌍  PayPal' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#000', padding: '60px 20px' }}>
      {/* Back link */}
      <div style={{ maxWidth: '1100px', margin: '0 auto 24px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: '#a0a0b8', cursor: 'pointer', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: 0 }}
        >
          ← Back to Pricing
        </button>
      </div>

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) 380px',
          gap: '32px',
          alignItems: 'start',
        }}
        className="checkout-grid"
      >
        {/* ─── LEFT: Form ─── */}
        <div style={{ background: '#0d0d12', borderRadius: '16px', padding: '40px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#fff', marginBottom: '8px' }}>Checkout</h1>
          <p style={{ color: '#a0a0b8', fontSize: '15px', marginBottom: '32px' }}>Complete your purchase securely.</p>

          <h3 style={{ color: '#fff', fontWeight: '700', fontSize: '20px', marginBottom: '16px', marginTop: '16px' }}>Account Details</h3>
          <input type="text" placeholder="Full Name *" value={fullName} onChange={e => setFullName(e.target.value)} style={inputStyle} />
          <input type="email" placeholder="yourname@gmail.com *" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Company Name *" value={company} onChange={e => setCompany(e.target.value)} style={inputStyle} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input type="password" placeholder="Password (min 6 chars) *" value={password} onChange={e => setPassword(e.target.value)} style={{ ...inputStyle, marginBottom: 0 }} />
            <input type="password" placeholder="Confirm Password *" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={{ ...inputStyle, marginBottom: 0 }} />
          </div>

          <h3 style={{ color: '#fff', fontWeight: '700', fontSize: '20px', marginBottom: '16px', marginTop: '24px' }}>Billing Details</h3>
          <select value={country} onChange={e => setCountry(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="" style={{ background: '#0d0d12' }}>Select your country</option>
            <option value="IN" style={{ background: '#0d0d12' }}>India</option>
            <option value="US" style={{ background: '#0d0d12' }}>United States</option>
            <option value="UK" style={{ background: '#0d0d12' }}>United Kingdom</option>
            <option value="CA" style={{ background: '#0d0d12' }}>Canada</option>
            <option value="AU" style={{ background: '#0d0d12' }}>Australia</option>
            <option value="SG" style={{ background: '#0d0d12' }}>Singapore</option>
            <option value="AE" style={{ background: '#0d0d12' }}>UAE</option>
          </select>
          <input type="text" placeholder="Coupon Code (Optional)" value={coupon} onChange={e => setCoupon(e.target.value)} style={inputStyle} />

          <h3 style={{ color: '#fff', fontWeight: '700', fontSize: '20px', marginBottom: '16px', marginTop: '24px' }}>Payment Method</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
            {paymentOptions.map(opt => (
              <div
                key={opt.id}
                onClick={() => setPaymentMethod(opt.id)}
                style={{
                  background: paymentMethod === opt.id ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                  border: paymentMethod === opt.id ? '1px solid rgba(99,102,241,0.6)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  padding: '16px 20px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  userSelect: 'none',
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>

          {/* Terms checkbox */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <input
              type="checkbox"
              id="terms-check"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              style={{ marginTop: '3px', width: '16px', height: '16px', cursor: 'pointer', accentColor: '#a855f7' }}
            />
            <label htmlFor="terms-check" style={{ color: '#a0a0b8', fontSize: '14px', lineHeight: '1.6', cursor: 'pointer' }}>
              I'm ready to proceed to checkout after clearly reading the{' '}
              <Link to="/privacy-policy" style={{ color: '#60a5fa', textDecoration: 'none' }}>Privacy Policy</Link>,{' '}
              <Link to="/refund-policy" style={{ color: '#60a5fa', textDecoration: 'none' }}>Refund Policy</Link> and{' '}
              <Link to="/terms" style={{ color: '#60a5fa', textDecoration: 'none' }}>Terms &amp; Conditions</Link>.
            </label>
          </div>
        </div>

        {/* ─── RIGHT: Order Summary ─── */}
        <div style={{ background: '#0d0d12', borderRadius: '16px', padding: '36px', border: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', marginBottom: '32px' }}>Order Summary</h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ color: '#a0a0b8', fontSize: '15px' }}>Plan</span>
            <span style={{ color: '#fff', fontWeight: '700' }}>{plan.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ color: '#a0a0b8', fontSize: '15px' }}>Billing</span>
            <span style={{ color: '#fff' }}>{billingLabel}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
            <span style={{ color: '#fff', fontSize: '20px', fontWeight: '800' }}>Total</span>
            <span style={{ color: '#fff', fontSize: '28px', fontWeight: '900' }}>{isPremium ? 'Custom' : plan.price}</span>
          </div>

          {/* Error message */}
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', color: '#f87171', fontSize: '14px' }}>
              ⚠ {error}
            </div>
          )}

          <button
            disabled={!agreed || loading}
            onClick={handleProceedToPayment}
            style={{
              width: '100%',
              padding: '18px',
              borderRadius: '12px',
              background: agreed && !loading ? 'linear-gradient(135deg, #4f8ef7 0%, #e040fb 100%)' : 'rgba(255,255,255,0.08)',
              color: agreed && !loading ? '#fff' : '#555',
              border: 'none',
              fontWeight: '800',
              fontSize: '16px',
              cursor: agreed && !loading ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              marginBottom: '16px',
              boxShadow: agreed && !loading ? '0 4px 24px rgba(224,64,251,0.3)' : 'none',
            }}
          >
            {loading ? 'Redirecting to Stripe…' : isPremium ? 'Contact Sales' : 'Proceed to Payment'}
          </button>

          <p style={{ color: '#444', fontSize: '12px', textAlign: 'center', marginBottom: '20px' }}>
            🔒 Secure encrypted checkout. Your payment information is protected.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to="/privacy-policy" style={{ color: '#555', textDecoration: 'none', fontSize: '12px' }}>Privacy Policy</Link>
            <Link to="/refund-policy" style={{ color: '#555', textDecoration: 'none', fontSize: '12px' }}>Refund Policy</Link>
            <Link to="/terms" style={{ color: '#555', textDecoration: 'none', fontSize: '12px' }}>Terms</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
