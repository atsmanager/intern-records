import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'paid' | 'failed'>('loading');
  const [details, setDetails] = useState<{ customerEmail?: string; amountTotal?: number; currency?: string } | null>(null);

  useEffect(() => {
    if (!sessionId) { setStatus('failed'); return; }
    fetch(`${VITE_API_URL}/stripe/session/${sessionId}`)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'paid') {
          setStatus('paid');
          setDetails({ customerEmail: data.customerEmail, amountTotal: data.amountTotal, currency: data.currency });
        } else {
          setStatus('failed');
        }
      })
      .catch(() => setStatus('failed'));
  }, [sessionId]);

  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ maxWidth: '540px', width: '100%', background: '#0d0d12', borderRadius: '20px', padding: '60px 40px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
        
        {status === 'loading' && (
          <>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#a855f7', margin: '0 auto 24px', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ color: '#a0a0b8' }}>Verifying your payment…</p>
          </>
        )}

        {status === 'paid' && (
          <>
            <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', marginBottom: '12px' }}>Payment Successful!</h1>
            <p style={{ color: '#a0a0b8', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
              Thank you for your purchase. You'll receive a confirmation email shortly.
            </p>
            {details?.customerEmail && (
              <p style={{ color: '#6b6b88', fontSize: '14px', marginBottom: '8px' }}>Confirmation sent to: <strong style={{ color: '#a0a0b8' }}>{details.customerEmail}</strong></p>
            )}
            {details?.amountTotal && (
              <p style={{ color: '#6b6b88', fontSize: '14px', marginBottom: '32px' }}>
                Amount paid: <strong style={{ color: '#22c55e' }}>${(details.amountTotal / 100).toFixed(2)} {details.currency?.toUpperCase()}</strong>
              </p>
            )}
            <Link to="/" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #4f8ef7 0%, #a855f7 100%)', color: '#fff', textDecoration: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '16px' }}>
              Go to Dashboard
            </Link>
          </>
        )}

        {status === 'failed' && (
          <>
            <div style={{ width: '80px', height: '80px', background: 'rgba(239,68,68,0.15)', border: '2px solid rgba(239,68,68,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', marginBottom: '12px' }}>Payment Failed</h1>
            <p style={{ color: '#a0a0b8', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
              We couldn't verify your payment. Please try again or contact support.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <Link to="/pricing" style={{ display: 'inline-block', background: '#fff', color: '#000', textDecoration: 'none', padding: '14px 24px', borderRadius: '12px', fontWeight: '700' }}>Try Again</Link>
              <Link to="/support" style={{ display: 'inline-block', background: 'transparent', color: '#a0a0b8', textDecoration: 'none', padding: '14px 24px', borderRadius: '12px', fontWeight: '700', border: '1px solid rgba(255,255,255,0.1)' }}>Contact Support</Link>
            </div>
          </>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default PaymentSuccess;
