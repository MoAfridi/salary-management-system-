export default function Settings() {
  return (
    <div className="page-content">
      <div className="grid-2">
        {[
          {
            title: "Company Info",
            fields: ["Company Name", "Industry", "Country", "Fiscal Year Start"]
          },
          {
            title: "Payroll Config",
            fields: ["Pay Frequency", "Tax Rate (%)", "Provident Fund (%)", "Payment Method"]
          },
          {
            title: "Notifications",
            fields: ["Payroll Email Alerts", "Approval Reminders", "New Employee Welcome", "Monthly Summary"]
          },
          {
            title: "Security",
            fields: ["Two-Factor Auth", "Session Timeout", "Password Policy", "Audit Logs"]
          },
        ].map((s, i) => (
          <div className="card" key={i}>
            <div className="card-head">
              <div className="card-title">{s.title}</div>
            </div>
            <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
              {s.fields.map((f, j) => (
                <div className="form-field" key={j}>
                  <label className="form-label">{f}</label>
                  {f.includes("Auth") || f.includes("Logs") || f.includes("Reminders") || f.includes("Email") || f.includes("Welcome") || f.includes("Summary") ? (
                    <select className="form-select">
                      <option>Enabled</option>
                      <option>Disabled</option>
                    </select>
                  ) : (
                    <input
                      className="form-input"
                      defaultValue={
                        f === "Company Name" ? "PayFlow Technologies" :
                        f === "Industry" ? "Technology" :
                        f === "Country" ? "Bangladesh" :
                        f === "Fiscal Year Start" ? "January" :
                        f === "Pay Frequency" ? "Monthly" :
                        f === "Tax Rate (%)" ? "15" :
                        f === "Provident Fund (%)" ? "5" :
                        f === "Payment Method" ? "Bank Transfer" :
                        f === "Session Timeout" ? "30 minutes" :
                        f === "Password Policy" ? "Strong (12+ chars)" : ""
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button className="btn-secondary">Reset Defaults</button>
        <button className="btn-primary">💾 Save Settings</button>
      </div>
    </div>
  );
}