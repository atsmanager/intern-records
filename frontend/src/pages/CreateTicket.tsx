import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    Tawk_API?: { toggle?: () => void; maximize?: () => void };
    Tawk_LoadStart?: Date;
  }
}

const injectTawkTo = () => {
  if (document.getElementById('tawkto-script')) return;
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  const s1 = document.createElement('script');
  s1.id = 'tawkto-script';
  s1.async = true;
  s1.src = 'https://embed.tawk.to/6a8041ea1d62051d4f67fc2c/1k02g2vdd';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  const s0 = document.getElementsByTagName('script')[0];
  if (s0?.parentNode) s0.parentNode.insertBefore(s1, s0);
};

const TICKET_EMAIL = 'tickets@centennial-8jv151.p.tawk.email';

const FAQS = [
  { category: 'Getting Started', icon: '🚀', articles: ['How to set up your ATS', 'Adding your first candidate', 'Inviting team members'] },
  { category: 'Billing & Plans', icon: '💳', articles: ['How to upgrade your plan', 'Refund eligibility', 'Cancelling a subscription'] },
  { category: 'Technical Issues', icon: '🔧', articles: ['Login problems', 'Data import errors', 'Performance issues'] },
  { category: 'Account Management', icon: '👤', articles: ['Resetting your password', 'Updating company details', 'Deleting an account'] },
];

const CreateTicket = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', category: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { injectTawkTo(); }, []);

  const filtered = search.trim()
    ? FAQS.map(f => ({
        ...f,
        articles: f.articles.filter(a => a.toLowerCase().includes(search.toLowerCase())),
      })).filter(f => f.articles.length > 0 || f.category.toLowerCase().includes(search.toLowerCase()))
    : FAQS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Ticket] ${form.subject || 'Support Request'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCategory: ${form.category}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${TICKET_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', fontFamily: 'inherit' }}>

      {/* ── HERO HEADER ── */}
      <div style={{ background: '#000', paddingTop: '80px', paddingBottom: '60px', textAlign: 'center', position: 'relative' }}>
        {/* Submit Ticket top-right */}
        <button
          onClick={() => setShowForm(true)}
          style={{ position: 'absolute', top: '24px', right: '32px', background: 'none', border: 'none', color: '#a0a0b8', fontSize: '14px', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          Submit Ticket
        </button>

        <button
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: '24px', left: '32px', background: 'none', border: 'none', color: '#a0a0b8', fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: 0 }}
        >
          ← Back
        </button>

        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', marginBottom: '16px' }}>
          Knowledge Base &amp; Support Tickets
        </h1>
        <p style={{ color: '#a0a0b8', fontSize: '15px', lineHeight: '1.7', maxWidth: '540px', margin: '0 auto 36px' }}>
          Need help? Submit a ticket and our team will get in touch with you as soon as possible.<br />
          We appreciate your patience and look forward to assisting you.
        </p>

        {/* Search bar */}
        <div style={{ maxWidth: '560px', margin: '0 auto 32px', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search for answers…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', background: '#fff', border: 'none', borderRadius: '8px', padding: '14px 48px 14px 20px', fontSize: '15px', color: '#111', outline: 'none', boxShadow: '0 2px 16px rgba(0,0,0,0.3)', boxSizing: 'border-box' }}
          />
          <svg style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        {/* Grid / List toggle */}
        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '4px', gap: '4px' }}>
          <button onClick={() => setViewMode('grid')} style={{ background: viewMode === 'grid' ? 'rgba(255,255,255,0.15)' : 'transparent', border: 'none', color: '#fff', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          </button>
          <button onClick={() => setViewMode('list')} style={{ background: viewMode === 'list' ? 'rgba(255,255,255,0.15)' : 'transparent', border: 'none', color: '#fff', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>

      {/* ── KNOWLEDGE BASE ARTICLES ── */}
      <div style={{ background: '#f5f5f5', minHeight: '300px', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#888', paddingTop: '60px' }}>
              <p style={{ fontSize: '18px', marginBottom: '16px' }}>No articles match your search.</p>
              <button onClick={() => setShowForm(true)} style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Submit a Ticket Instead</button>
            </div>
          ) : viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
              {filtered.map((cat, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>{cat.icon}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '12px' }}>{cat.category}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {cat.articles.map((a, j) => (
                      <li key={j} style={{ color: '#6366f1', fontSize: '14px', marginBottom: '8px', cursor: 'pointer' }}>• {a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtered.map((cat, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <span style={{ fontSize: '24px' }}>{cat.icon}</span>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>{cat.category}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {cat.articles.map((a, j) => (
                        <span key={j} style={{ color: '#6366f1', fontSize: '13px', cursor: 'pointer' }}>{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          {!search && (
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <p style={{ color: '#888', fontSize: '15px', marginBottom: '16px' }}>Didn't find what you were looking for?</p>
              <button
                onClick={() => setShowForm(true)}
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '10px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}
              >
                Submit a Support Ticket
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── TICKET FORM MODAL ── */}
      {showForm && (
        <div
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
        >
          <div style={{ background: '#0d0d12', borderRadius: '20px', padding: '40px', maxWidth: '560px', width: '100%', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setShowForm(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#a0a0b8', cursor: 'pointer', fontSize: '20px' }}>✕</button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎫</div>
                <h2 style={{ color: '#fff', fontSize: '24px', marginBottom: '12px' }}>Ticket Submitted!</h2>
                <p style={{ color: '#a0a0b8' }}>Your email client has opened with your ticket. Send the email to complete submission. Our team will respond within 1 business day.</p>
                <button onClick={() => { setShowForm(false); setSubmitted(false); }} style={{ marginTop: '24px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Close</button>
              </div>
            ) : (
              <>
                <h2 style={{ color: '#fff', fontSize: '26px', fontWeight: '800', marginBottom: '8px' }}>Submit a Ticket</h2>
                <p style={{ color: '#a0a0b8', fontSize: '14px', marginBottom: '28px' }}>Fill in the details below and we'll get back to you as soon as possible.</p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'Your name' },
                    { label: 'Email Address *', key: 'email', type: 'email', placeholder: 'your@email.com' },
                    { label: 'Subject *', key: 'subject', type: 'text', placeholder: 'Brief description of your issue' },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ color: '#a0a0b8', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>{field.label}</label>
                      <input
                        type={field.type}
                        required={field.label.includes('*')}
                        placeholder={field.placeholder}
                        value={(form as any)[field.key]}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ color: '#a0a0b8', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}>
                      <option value="" style={{ background: '#0d0d12' }}>Select a category</option>
                      <option value="Getting Started" style={{ background: '#0d0d12' }}>Getting Started</option>
                      <option value="Billing & Plans" style={{ background: '#0d0d12' }}>Billing &amp; Plans</option>
                      <option value="Technical Issues" style={{ background: '#0d0d12' }}>Technical Issues</option>
                      <option value="Account Management" style={{ background: '#0d0d12' }}>Account Management</option>
                      <option value="Other" style={{ background: '#0d0d12' }}>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ color: '#a0a0b8', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Message *</label>
                    <textarea
                      required
                      placeholder="Describe your issue in detail…"
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      rows={5}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 14px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
                    />
                  </div>
                  <p style={{ color: '#6b6b88', fontSize: '12px' }}>
                    Clicking Submit will open your email client pre-filled with your ticket details to send to <span style={{ color: '#a0a0b8' }}>{TICKET_EMAIL}</span>.
                  </p>
                  <button type="submit" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', marginTop: '4px' }}>
                    Submit Ticket
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTicket;
