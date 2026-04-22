import { useState } from "react";
import { fmt, PAYROLL_HIST } from "../data/seed";
import Avatar from "./Avatar";

interface Employee {
  id: number;
  name: string;
  email: string;
  dept: string;
  role: string;
  salary: number;
  status: string;
  joined: string;
  avatar: number;
}

interface PayrollProps {
  employees: Employee[];
}

export default function Payroll({ employees }: PayrollProps) {
  const [view, setView] = useState("current");
  const active = employees.filter(e => e.status === "Active");
  const totalGross = active.reduce((s, e) => s + Math.round(e.salary / 12), 0);
  const totalTax = Math.round(totalGross * 0.15);
  const totalPF = Math.round(totalGross * 0.05);
  const totalNet = totalGross - totalTax - totalPF;

  return (
    <div className="page-content">
      <div className="tab-bar">
        <div className={`tab-item${view === "current" ? " active" : ""}`} onClick={() => setView("current")}>
          Current Month
        </div>
        <div className={`tab-item${view === "history" ? " active" : ""}`} onClick={() => setView("history")}>
          Pay History
        </div>
      </div>

      {view === "current" && (
        <>
          <div className="mini-kpi-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
            {[
              { label: "Gross Payroll", val: fmt(totalGross) },
              { label: "Total Tax (15%)", val: fmt(totalTax) },
              { label: "Provident Fund (5%)", val: fmt(totalPF) },
              { label: "Net Payroll", val: fmt(totalNet) },
            ].map((k, i) => (
              <div key={i} className="mini-kpi">
                <div className="mini-kpi-label">{k.label}</div>
                <div className="mini-kpi-value">{k.val}</div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-head">
              <div>
                <div className="card-title">April 2026 Payroll</div>
                <div className="card-subtitle">{active.length} employees · Pending processing</div>
              </div>
              <span className="badge badge-pending">Pending</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Gross Salary</th>
                    <th>Tax (15%)</th>
                    <th>PF (5%)</th>
                    <th>Net Pay</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {active.map(e => {
                    const gross = Math.round(e.salary / 12);
                    const tax = Math.round(gross * 0.15);
                    const pf = Math.round(gross * 0.05);
                    const net = gross - tax - pf;
                    return (
                      <tr key={e.id}>
                        <td>
                          <div className="emp-cell">
                            <Avatar emp={e} />
                            <div>
                              <div className="emp-name-text">{e.name}</div>
                              <div className="emp-email">{e.role}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge-dept">{e.dept}</span></td>
                        <td style={{ fontWeight: 600 }}>{fmt(gross)}</td>
                        <td className="deduct-cell">−{fmt(tax)}</td>
                        <td className="deduct-cell">−{fmt(pf)}</td>
                        <td className="net-cell">{fmt(net)}</td>
                        <td><span className="badge badge-pending">Pending</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {view === "history" && (
        <div className="card">
          <div className="card-head">
            <div className="card-title">Payroll History</div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Gross Amount</th>
                  <th>Net Amount</th>
                  <th>Employees</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {PAYROLL_HIST.map(h => (
                  <tr key={h.id}>
                    <td style={{ fontWeight: 600, color: "var(--gray800)" }}>{h.month}</td>
                    <td>{fmt(h.gross)}</td>
                    <td style={{ fontWeight: 700, color: "var(--g700)" }}>{fmt(h.net)}</td>
                    <td>{h.count} employees</td>
                    <td style={{ color: "var(--gray400)", fontSize: 12 }}>{h.date}</td>
                    <td><span className="badge badge-paid">✓ {h.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}