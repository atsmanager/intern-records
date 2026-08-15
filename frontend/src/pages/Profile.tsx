import React from 'react';
import { useLoginStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useLoginStore();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const isAdmin = user.role === 'superadmin' || user.role === 'admin';

  // Determine plan label based on role/company
  const getPlan = () => {
    if (user.role === 'superadmin') return { label: 'Super Admin', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' };
    if (user.role === 'admin') return { label: 'Admin', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' };
    return { label: 'Basic Plan', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' };
  };

  const plan = getPlan();

  return (
    <div style={{ padding: '60px 20px', minHeight: '100vh', background: '#000' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: '#a0a0b8', cursor: 'pointer', fontSize: '14px', marginBottom: '32px', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: 0 }}
        >
          ← Back
        </button>

        {/* Header Card */}
        <div style={{ background: '#0d0d12', borderRadius: '20px', padding: '40px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
          {/* Gradient accent */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #4f8ef7, #a855f7, #ec4899)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
            {/* Avatar */}
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f8ef7 0%, #a855f7 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', fontWeight: '800', color: '#fff', flexShrink: 0
            }}>
              {(user.user || user.email)?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#fff', marginBottom: '4px' }}>{user.user || 'User'}</h1>
              <p style={{ color: '#a0a0b8', fontSize: '14px' }}>{user.email}</p>
            </div>
          </div>

          {/* Admin badge */}
          {isAdmin && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '8px', padding: '8px 16px', marginBottom: '24px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              <span style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '700' }}>{user.role === 'superadmin' ? 'Super Administrator' : 'Administrator'}</span>
            </div>
          )}

          {/* Info grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ color: '#6b6b88', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Full Name</p>
              <p style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>{user.user || '—'}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ color: '#6b6b88', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Email</p>
              <p style={{ color: '#fff', fontSize: '16px', fontWeight: '600', wordBreak: 'break-all' }}>{user.email}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ color: '#6b6b88', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Registered Company</p>
              <p style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>{user.company || '—'}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ color: '#6b6b88', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Role</p>
              <p style={{ color: '#fff', fontSize: '16px', fontWeight: '600', textTransform: 'capitalize' }}>{user.role}</p>
            </div>
          </div>
        </div>

        {/* Membership / Plan Card */}
        <div style={{ background: '#0d0d12', borderRadius: '20px', padding: '32px 40px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Membership & Plan</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p style={{ color: '#6b6b88', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Current Plan</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: plan.bg, border: `1px solid ${plan.color}44`, borderRadius: '8px', padding: '8px 16px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span style={{ color: plan.color, fontWeight: '700', fontSize: '15px' }}>{plan.label}</span>
              </div>
            </div>
            {!isAdmin && (
              <button
                onClick={() => navigate('/pricing')}
                style={{ background: 'linear-gradient(135deg, #4f8ef7 0%, #a855f7 100%)', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 24px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
              >
                Upgrade Plan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
