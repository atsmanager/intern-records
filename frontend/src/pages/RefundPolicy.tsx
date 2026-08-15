import { useNavigate } from 'react-router-dom';

const RefundPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="app-page" style={{ padding: "60px 20px", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: '#a0a0b8', cursor: 'pointer', fontSize: '14px', marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: 0 }}
        >
          ← Back
        </button>
        <div style={{ background: "var(--bg-card, #0d0d12)", padding: "40px", borderRadius: "16px", border: "1px solid var(--border, rgba(255,255,255,0.08))" }}>
          <h1 style={{ fontSize: "32px", marginBottom: "8px", color: "var(--text-primary, #fff)" }}>Refund & Cancellation Policy</h1>
          <p style={{ color: "var(--text-secondary, #a0a0b8)", fontSize: "14px", marginBottom: "32px" }}>Last Updated: August 15, 2026</p>
          
          <div style={{ color: "var(--text-secondary, #a0a0b8)", lineHeight: "1.8", fontSize: "15px" }}>
            <p style={{ marginBottom: "24px" }}>This Refund & Cancellation Policy applies to services purchased from Centennial Infotech, including ATS services, hosting, software services, recruitment services, web development, mobile app development, digital marketing, and other professional services.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>ATS and Software Services</h3>
            <p style={{ marginBottom: "12px" }}>For one-time ATS setup, installation, configuration, customization, or software services, fees may be non-refundable once work has commenced or the service has been delivered.</p>
            <p style={{ marginBottom: "24px" }}>Where applicable, refund eligibility will depend on the specific service agreement or order.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Recurring ATS / Hosting Services</h3>
            <p>For recurring ATS, hosting, or subscription services:</p>
            <ul style={{ marginLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li>Customers may cancel future renewals according to the applicable subscription terms.</li>
              <li>Cancellation generally prevents the next billing cycle from being charged.</li>
              <li>Fees already paid for a current billing period may not be refundable unless otherwise stated in the applicable agreement.</li>
              <li>If a service is suspended because of non-payment, outstanding balances may remain payable.</li>
            </ul>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Recruitment Services</h3>
            <p style={{ marginBottom: "12px" }}>Recruitment and staffing fees may be subject to separate client agreements.</p>
            <p style={{ marginBottom: "24px" }}>Because recruitment services involve sourcing, screening, candidate communication, and other work performed on behalf of clients, payments may become non-refundable once recruitment work has begun, except where the applicable agreement provides otherwise.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Web, Mobile & Digital Services</h3>
            <p style={{ marginBottom: "12px" }}>For development and digital marketing projects, refunds and cancellations are governed primarily by the applicable project agreement, proposal, milestone, or statement of work.</p>
            <p style={{ marginBottom: "24px" }}>Work already completed or delivered may not be refundable.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Refund Requests</h3>
            <p style={{ marginBottom: "12px" }}>To request a refund or discuss a cancellation, contact us at:</p>
            <p style={{ marginBottom: "12px" }}>contact@centennialinfotech.com</p>
            <p style={{ marginBottom: "24px" }}>Please include your name, company name, service purchased, payment date, and reason for the request.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Refund Processing</h3>
            <p style={{ marginBottom: "24px" }}>Approved refunds will generally be processed through the original payment method. Processing times may vary depending on the payment provider or financial institution.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Changes to This Policy</h3>
            <p style={{ marginBottom: "24px" }}>We may update this policy from time to time. Changes will be posted on this page with an updated date.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
