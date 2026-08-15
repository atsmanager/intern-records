import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="pricing-section" style={{ minHeight: "100vh", padding: "80px 20px" }}>
      <div className="section-inner" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: '#a0a0b8', cursor: 'pointer', fontSize: '14px', marginBottom: '40px', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: 0 }}
        >
          ← Back
        </button>
        
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 className="section-title">Transparent Pricing</h1>
          <p className="section-sub">Choose the right plan for your recruitment needs.</p>
        </div>

        <div className="pricing-grid">
          
          {/* Basic Plan */}
          <div className="pricing-card">
            <h2 className="pricing-plan-name">Basic</h2>
            <div className="pricing-price" style={{ justifyContent: "center", marginBottom: "24px" }}>
              <span className="price-dollar">$</span>
              <span className="price-amount">200</span>
              <span style={{ color: "#a0a0b8", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginLeft: "4px" }}>ONE TIME</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", flexGrow: 1 }}>
              {[
                "ATS Installation",
                "Client-Owned Website/Server",
                "Job Posting",
                "Candidate Management",
                "Applicant Tracking",
                "Recruitment Dashboard",
                "Basic Support"
              ].map((feature, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", color: "#a0a0b8", fontSize: "15px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              className="btn-secondary" 
              onClick={() => navigate('/checkout', { state: { name: "Basic Plan", price: "$200", interval: "one time", description: "Perfect for a simple, client-owned ATS setup.", features: [ "ATS Installation", "Client-Owned Website/Server", "Job Posting", "Candidate Management", "Applicant Tracking", "Recruitment Dashboard", "Basic Support" ] } })}
              style={{ width: "100%", background: "#ffffff", color: "#000000", border: "none", padding: "16px", borderRadius: "12px", fontWeight: "800", cursor: "pointer" }}
            >
              View Plan and Checkout
            </button>
          </div>

          {/* Professional Plan */}
          <div className="pricing-card popular" style={{ transform: "scale(1.05)" }}>
            <div className="popular-badge">MOST POPULAR</div>
            <h2 className="pricing-plan-name">Professional</h2>
            <div className="pricing-price" style={{ justifyContent: "center", marginBottom: "24px" }}>
              <span className="price-dollar">$</span>
              <span className="price-amount">50</span>
              <span style={{ color: "#a0a0b8", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginLeft: "4px" }}>/ ANNUALLY</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", flexGrow: 1 }}>
              {[
                "Fully Ready-to-Use ATS",
                "Our Hosting Included",
                "Job Posting & Applicant Tracking",
                "Candidate Database",
                "Recruitment Dashboard",
                "Client Recruitment Portal",
                "Maintenance & Updates",
                "Technical Support"
              ].map((feature, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", color: "#ffffff", fontSize: "15px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              className="btn-primary" 
              onClick={() => navigate('/checkout', { state: { name: "Professional Plan", price: "$50", interval: "/ annually", description: "Our fully managed ATS with hosting and continuous updates.", features: [ "Fully Ready-to-Use ATS", "Our Hosting Included", "Job Posting & Applicant Tracking", "Candidate Database", "Recruitment Dashboard", "Client Recruitment Portal", "Maintenance & Updates", "Technical Support" ] } })}
              style={{ width: "100%", padding: "16px", borderRadius: "12px", background: "linear-gradient(135deg, #4f8ef7 0%, #e040fb 100%)", boxShadow: "0 4px 24px rgba(224,64,251,0.3)", cursor: "pointer", color: "#fff", border: "none", fontWeight: "800" }}
            >
              View Plan and Checkout
            </button>
          </div>

          {/* Premium Plan */}
          <div className="pricing-card">
            <h2 className="pricing-plan-name">Premium</h2>
            <div className="pricing-price" style={{ justifyContent: "center", marginBottom: "24px" }}>
              <span className="price-amount" style={{ fontSize: "36px" }}>Custom</span>
              <span style={{ color: "#a0a0b8", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginLeft: "4px" }}>PRICING</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", flexGrow: 1 }}>
              {[
                "Everything in Managed ATS",
                "Job Posting & Distribution",
                "Active Candidate Sourcing",
                "Passive Talent Sourcing",
                "Candidate Screening",
                "Candidate Shortlisting",
                "Interview Coordination",
                "Candidate Submission",
                "End-to-End Recruitment Support"
              ].map((feature, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", color: "#a0a0b8", fontSize: "15px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              className="btn-secondary" 
              onClick={() => navigate('/support')}
              style={{ width: "100%", background: "#ffffff", color: "#000000", border: "none", padding: "16px", borderRadius: "12px", fontWeight: "800", cursor: "pointer" }}
            >
              Contact Sales
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pricing;
