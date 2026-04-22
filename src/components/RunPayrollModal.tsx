import { fmt } from "../data/seed";

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

interface RunPayrollModalProps {
  employees: Employee[];
  onClose: () => void;
}

export default function RunPayrollModal({ employees, onClose }: RunPayrollModalProps) {
  const active = employees.filter(e => e.status === "Active");
  const gross = active.reduce((s, e) => s + Math.round(e.salary / 12), 0);
  const net = Math.round(gross * 0.8);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="modal-title">Run Payroll — April 2026</div>
            <div className="modal-sub">Review & confirm before processing</div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div style={{ background: "var(--gray50)", borderRadius: 12, padding: "16px 18px", marginBottom: 16 }}>
            {[
              ["Employees to process", `${active.length} active`],
              ["Gross Payroll", fmt(gross)],
              ["Total Deductions (20%)", `−${fmt(gross * 0.2)}`],
              ["Net Payroll", fmt(net)],
            ].map(([l, v], i) => (
              <div className="payslip-row-item" key={l} style={i === 3 ? { borderTop: "2px solid var(--g200)", paddingTop: 12, marginTop: 4 } : {}}>
                <span className="payslip-label">{l}</span>
                <span style={{ fontWeight: i === 3 ? 800 : 600, color: i === 3 ? "var(--g700)" : "var(--gray800)", fontSize: i === 3 ? 16 : 14 }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--g50)", border: "1px solid var(--g200)", borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "var(--g800)" }}>
            ✓ Payslips will be sent via email to all {active.length} active employees
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary pulse" onClick={onClose}>▶ Confirm & Process</button>
        </div>
      </div>
    </div>
  );
}