import { fmt } from "../data/seed";
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

interface PayslipModalProps {
  emp: Employee;
  onClose: () => void;
}

export default function PayslipModal({ emp, onClose }: PayslipModalProps) {
  const gross = Math.round(emp.salary / 12);
  const house = Math.round(gross * 0.1);
  const transport = Math.round(gross * 0.05);
  const totalEarnings = gross + house + transport;
  const tax = Math.round(gross * 0.15);
  const pf = Math.round(gross * 0.05);
  const totalDeduct = tax + pf;
  const net = totalEarnings - totalDeduct;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar emp={emp} size={44} />
            <div>
              <div className="modal-title">{emp.name}</div>
              <div className="modal-sub">{emp.role} · {emp.dept} · April 2026</div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="payslip-section-title">Earnings</div>
          {[
            ["Basic Salary", fmt(gross)],
            ["House Allowance (10%)", fmt(house)],
            ["Transport Allowance (5%)", fmt(transport)],
          ].map(([l, v]) => (
            <div className="payslip-row-item" key={l}>
              <span className="payslip-label">{l}</span>
              <span className="payslip-val">{v}</span>
            </div>
          ))}
          <div className="payslip-row-item" style={{ background: "var(--g50)", borderRadius: 6, padding: "8px 10px", marginTop: 6 }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>Total Earnings</span>
            <span style={{ fontWeight: 700, color: "var(--g700)" }}>{fmt(totalEarnings)}</span>
          </div>

          <div className="payslip-section-title" style={{ marginTop: 18 }}>Deductions</div>
          {[
            ["Income Tax (15%)", fmt(tax)],
            ["Provident Fund (5%)", fmt(pf)],
          ].map(([l, v]) => (
            <div className="payslip-row-item" key={l}>
              <span className="payslip-label">{l}</span>
              <span className="payslip-deduct">−{v}</span>
            </div>
          ))}
          <div className="payslip-net">
            <div>
              <div className="payslip-net-label">Net Pay · April 2026</div>
            </div>
            <div className="payslip-net-val">{fmt(net)}</div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary">⬇ Download PDF</button>
        </div>
      </div>
    </div>
  );
}