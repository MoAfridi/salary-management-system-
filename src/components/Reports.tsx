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

interface ReportsProps {
  employees: Employee[];
}

export default function Reports({ employees }: ReportsProps) {
  const salaries = employees.map(e => e.salary);
  const avg = Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length);
  const max = Math.max(...salaries);
  const min = Math.min(...salaries);
  const total = salaries.reduce((a, b) => a + b, 0);

  const deptMap: { [key: string]: { count: number; salary: number } } = {};
  employees.forEach(e => {
    if (!deptMap[e.dept]) deptMap[e.dept] = { count: 0, salary: 0 };
    deptMap[e.dept].count++;
    deptMap[e.dept].salary += e.salary;
  });
  const deptList = Object.entries(deptMap).sort((a, b) => b[1].salary - a[1].salary);
  const maxD = Math.max(...deptList.map(d => d[1].salary));

  const bands = [
    { label: "< $60K", count: employees.filter(e => e.salary < 60000).length },
    { label: "$60K–$80K", count: employees.filter(e => e.salary >= 60000 && e.salary < 80000).length },
    { label: "$80K–$100K", count: employees.filter(e => e.salary >= 80000 && e.salary < 100000).length },
    { label: "$100K+", count: employees.filter(e => e.salary >= 100000).length },
  ];

  const topEarners = [...employees].sort((a, b) => b.salary - a.salary).slice(0, 5);

  return (
    <div className="page-content">
      <div className="report-kpi-grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 20 }}>
        {[
          { label: "Average Salary", val: fmt(avg) },
          { label: "Highest Salary", val: fmt(max) },
          { label: "Lowest Salary", val: fmt(min) },
          { label: "Annual Spend", val: fmt(total) },
        ].map((k, i) => (
          <div key={i} className="report-kpi">
            <div className="report-kpi-label">{k.label}</div>
            <div className="report-kpi-val">{k.val}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="card-head">
            <div className="card-title">Payroll by Department</div>
          </div>
          <div style={{ padding: "16px 22px" }}>
            {deptList.map(([dept, d]) => (
              <div className="bar-row" key={dept}>
                <div className="bar-label" style={{ width: 100 }}>{dept}</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.round(d.salary / maxD * 100)}%` }} />
                </div>
                <div style={{ fontSize: 11, color: "var(--gray400)", minWidth: 14, textAlign: "center" }}>
                  {d.count}
                </div>
                <div className="bar-value">{fmt(d.salary)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Salary Distribution</div>
          </div>
          <div style={{ padding: "16px 22px" }}>
            {bands.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--gray100)" }}>
                <span style={{ fontSize: 13, color: "var(--gray700)", fontWeight: 500 }}>{b.label}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="dot-wrap">
                    {Array.from({ length: b.count }).map((_, j) => (
                      <div key={j} className="dot" />
                    ))}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--g700)", minWidth: 24, textAlign: "right" }}>
                    {b.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-title">Top Earners</div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Role</th>
                <th>Annual Salary</th>
                <th>% of Total</th>
              </tr>
            </thead>
            <tbody>
              {topEarners.map((e, i) => (
                <tr key={e.id}>
                  <td style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--gray300)", fontSize: 18 }}>
                    #{i + 1}
                  </td>
                  <td>
                    <div className="emp-cell">
                      <Avatar emp={e} />
                      <div>
                        <div className="emp-name-text">{e.name}</div>
                        <div className="emp-email">{e.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge-dept">{e.dept}</span></td>
                  <td style={{ fontSize: 13, color: "var(--gray500)" }}>{e.role}</td>
                  <td style={{ fontWeight: 700, color: "var(--g700)", fontSize: 15 }}>{fmt(e.salary)}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: "var(--gray100)", borderRadius: 20, overflow: "hidden", width: 80 }}>
                        <div style={{ height: "100%", background: "var(--g400)", borderRadius: 20, width: `${Math.round(e.salary / total * 100 * 3)}%` }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--g600)" }}>
                        {(e.salary / total * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}