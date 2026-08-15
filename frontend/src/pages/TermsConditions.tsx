import { useNavigate } from 'react-router-dom';

const TermsConditions = () => {
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
          <h1 style={{ fontSize: "32px", marginBottom: "8px", color: "var(--text-primary, #fff)" }}>Terms & Conditions</h1>
          <p style={{ color: "var(--text-secondary, #a0a0b8)", fontSize: "14px", marginBottom: "32px" }}>Last Updated: August 15, 2026</p>
          
          <div style={{ color: "var(--text-secondary, #a0a0b8)", lineHeight: "1.8", fontSize: "15px" }}>
            <p style={{ marginBottom: "12px" }}>These Terms & Conditions govern your use of the Centennial Infotech website and services.</p>
            <p style={{ marginBottom: "24px" }}>By accessing our website or purchasing or using our services, you agree to these Terms & Conditions.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Our Services</h3>
            <p>Centennial Infotech provides services that may include:</p>
            <ul style={{ marginLeft: "24px", marginBottom: "12px", listStyleType: "disc" }}>
              <li>Recruitment and staffing</li>
              <li>Talent acquisition</li>
              <li>Candidate sourcing</li>
              <li>Passive talent sourcing</li>
              <li>Applicant Tracking System (ATS)</li>
              <li>ATS hosting and software services</li>
              <li>Web development</li>
              <li>Mobile app development</li>
              <li>Software development</li>
              <li>Digital marketing</li>
              <li>Other technology and professional services</li>
            </ul>
            <p style={{ marginBottom: "24px" }}>Specific services, pricing, deliverables, timelines, and responsibilities may be defined in separate proposals, agreements, invoices, or statements of work.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>ATS Services</h3>
            <p>Depending on the selected plan, the ATS may be:</p>
            <ul style={{ marginLeft: "24px", marginBottom: "12px", listStyleType: "disc" }}>
              <li>Installed on a client's own infrastructure; or</li>
              <li>Hosted and managed by Centennial Infotech.</li>
            </ul>
            <p style={{ marginBottom: "24px" }}>Clients are responsible for providing accurate information and using the ATS in accordance with applicable laws and these Terms.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Recruitment Services</h3>
            <p style={{ marginBottom: "12px" }}>Centennial Infotech may assist clients with sourcing, screening, shortlisting, and presenting candidates.</p>
            <p style={{ marginBottom: "24px" }}>We do not guarantee that a particular candidate will be hired, remain employed, or achieve a particular performance outcome unless expressly stated in a written agreement.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>User Responsibilities</h3>
            <p>Users agree not to:</p>
            <ul style={{ marginLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li>Use our services for unlawful purposes</li>
              <li>Submit false or misleading information</li>
              <li>Attempt unauthorized access to our systems</li>
              <li>Interfere with website or ATS functionality</li>
              <li>Upload malicious software or harmful content</li>
              <li>Violate another person's privacy or intellectual-property rights</li>
              <li>Use our services in violation of applicable laws</li>
            </ul>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Accounts</h3>
            <p style={{ marginBottom: "12px" }}>Where an account is required, users are responsible for maintaining the confidentiality of their login credentials and for activity conducted through their account.</p>
            <p style={{ marginBottom: "24px" }}>You should notify us promptly if you believe your account has been compromised.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Intellectual Property</h3>
            <p style={{ marginBottom: "12px" }}>Unless otherwise agreed in writing, Centennial Infotech retains rights to its software, platforms, designs, systems, trademarks, documentation, and other proprietary materials.</p>
            <p style={{ marginBottom: "24px" }}>Client-specific work may be subject to separate ownership or licensing terms contained in the applicable agreement.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Payments</h3>
            <p style={{ marginBottom: "12px" }}>Customers agree to pay the applicable fees for purchased services according to the agreed pricing, subscription terms, invoice, proposal, or service agreement.</p>
            <p style={{ marginBottom: "24px" }}>Recurring services may automatically renew unless cancelled according to the applicable subscription terms.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Third-Party Services</h3>
            <p style={{ marginBottom: "12px" }}>Our services may integrate with or depend on third-party services, platforms, payment processors, hosting providers, APIs, or software.</p>
            <p style={{ marginBottom: "24px" }}>Centennial Infotech is not responsible for outages or changes caused by third-party providers beyond our reasonable control.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Disclaimer</h3>
            <p style={{ marginBottom: "12px" }}>Our services are provided based on the applicable service agreement and available functionality.</p>
            <p style={{ marginBottom: "24px" }}>We do not guarantee uninterrupted website or ATS availability or that recruitment services will result in a particular hiring outcome unless expressly agreed in writing.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Limitation of Liability</h3>
            <p style={{ marginBottom: "12px" }}>To the extent permitted by applicable law, Centennial Infotech will not be responsible for indirect, incidental, consequential, or special damages arising from the use of our website or services.</p>
            <p style={{ marginBottom: "24px" }}>Any additional limitations or liability terms may be specified in an applicable written agreement.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Termination</h3>
            <p style={{ marginBottom: "24px" }}>We may suspend or terminate access to services where a user violates these Terms, fails to pay applicable fees, engages in unlawful activity, or otherwise creates a security or operational risk.</p>

            <h3 style={{ color: "#fff", marginTop: "32px", marginBottom: "16px" }}>Changes to These Terms</h3>
            <p style={{ marginBottom: "24px" }}>We may update these Terms & Conditions from time to time. Updated terms will be posted on this page with a revised "Last Updated" date.</p>

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

export default TermsConditions;
