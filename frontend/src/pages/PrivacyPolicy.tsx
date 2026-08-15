import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
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
          <h1 style={{ fontSize: "32px", marginBottom: "8px", color: "var(--text-primary, #fff)" }}>Privacy Policy</h1>
          <p style={{ color: "var(--text-secondary, #a0a0b8)", fontSize: "14px", marginBottom: "32px" }}>Last Updated: August 15, 2026</p>
          
          <div style={{ color: "var(--text-secondary, #a0a0b8)", lineHeight: "1.8", fontSize: "15px" }}>
            <p style={{ marginBottom: "24px" }}>Centennial Infotech ("Centennial Infotech," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you provide when using our website, services, Applicant Tracking System (ATS), recruitment services, staffing solutions, and other business services.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Information We Collect</h3>
            <p>Depending on how you use our services, we may collect:</p>
            <ul style={{ marginLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li>Name and contact information</li>
              <li>Email address and phone number</li>
              <li>Company and business information</li>
              <li>Resume/CV and professional information</li>
              <li>Employment history, skills, qualifications, and experience</li>
              <li>Job application information</li>
              <li>Information submitted through our ATS</li>
              <li>Account and login information</li>
              <li>Payment and billing information</li>
              <li>Website usage and technical information</li>
              <li>Communications and inquiries submitted to us</li>
            </ul>
            <p style={{ marginBottom: "24px" }}>We only request information that is reasonably necessary for the relevant service or business purpose.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>How We Use Information</h3>
            <p>We may use collected information to:</p>
            <ul style={{ marginLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li>Provide and operate our services</li>
              <li>Process job applications and recruitment activities</li>
              <li>Connect candidates with potential employers</li>
              <li>Provide staffing and talent acquisition services</li>
              <li>Operate and maintain our ATS</li>
              <li>Process payments and subscriptions</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Improve our website, software, and services</li>
              <li>Communicate service-related information</li>
              <li>Prevent fraud, abuse, or unauthorized activity</li>
              <li>Comply with applicable legal requirements</li>
            </ul>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Candidate Information</h3>
            <p style={{ marginBottom: "12px" }}>Candidates may provide resumes, employment history, qualifications, contact information, and other professional information through our recruitment services or ATS.</p>
            <p style={{ marginBottom: "24px" }}>Where appropriate, candidate information may be shared with prospective employers or clients for recruitment and hiring purposes. We encourage candidates to provide only accurate and relevant information.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Payment Information</h3>
            <p style={{ marginBottom: "24px" }}>Payments may be processed through third-party payment providers. Centennial Infotech generally does not store complete payment-card information on its own servers. Payment providers process payment information according to their own privacy policies and security practices.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Cookies</h3>
            <p style={{ marginBottom: "12px" }}>Our website may use cookies and similar technologies to maintain functionality, understand website usage, improve user experience, and support security.</p>
            <p style={{ marginBottom: "24px" }}>You may be able to control cookies through your browser settings.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Third-Party Services</h3>
            <p>We may use third-party providers for services such as:</p>
            <ul style={{ marginLeft: "24px", marginBottom: "12px", listStyleType: "disc" }}>
              <li>Payment processing</li>
              <li>Hosting</li>
              <li>Analytics</li>
              <li>Email communication</li>
              <li>Authentication</li>
              <li>Recruitment technology</li>
              <li>Website functionality</li>
            </ul>
            <p style={{ marginBottom: "24px" }}>These providers may process information according to their own terms and privacy policies.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Data Security</h3>
            <p style={{ marginBottom: "12px" }}>We use reasonable administrative, technical, and organizational measures designed to protect personal information from unauthorized access, loss, misuse, alteration, or disclosure.</p>
            <p style={{ marginBottom: "24px" }}>However, no internet-based system can be guaranteed to be completely secure.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Data Retention</h3>
            <p style={{ marginBottom: "24px" }}>We retain information for as long as reasonably necessary to provide our services, fulfill business purposes, maintain records, resolve disputes, and comply with applicable legal obligations.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Your Rights</h3>
            <p style={{ marginBottom: "12px" }}>Depending on applicable law, you may have rights relating to your personal information, including requesting access, correction, deletion, or other restrictions on processing.</p>
            <p style={{ marginBottom: "24px" }}>To make a privacy-related request, contact us using the information below.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Children's Privacy</h3>
            <p style={{ marginBottom: "24px" }}>Our services are not intended for children who are not legally permitted to use such services. We do not knowingly collect personal information from children in violation of applicable law.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Changes to This Privacy Policy</h3>
            <p style={{ marginBottom: "24px" }}>We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised "Last Updated" date.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Contact</h3>
            <p style={{ marginBottom: "8px" }}>Centennial Infotech</p>
            <p style={{ marginBottom: "8px" }}>Email: contact@centennialinfotech.com</p>
            <p>Website: <a href="https://centennialinfotech.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#60a5fa", textDecoration: "none" }}>Centennial Infotech</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
