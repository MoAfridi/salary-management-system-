import React from 'react';
import type { Employee } from '../data/seed';
import { DEPTS, fmt } from '../data/seed';
import Avatar from './Avatar';
import StatusBadge from './StatusBadge';

interface DashboardProps {
  employees: Employee[];
  setPage: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ employees, setPage }) => {
  const active = employees.filter(e => e.status === "Active");
  const totalAnnual = active.reduce((s, e) => s + e.salary, 0);
  const totalMonthly = Math.round(totalAnnual / 12);

  const deptMap: { [key: string]: { count: number; salary: number } } = {};
  employees.forEach(e => {
    if (!deptMap[e.dept]) deptMap[e.dept] = { count: 0, salary: 0 };
    deptMap[e.dept].count++;
    deptMap[e.dept].salary += e.salary;
  });
  const deptList = Object.entries(deptMap).sort((a, b) => b[1].salary - a[1].salary);
  const maxDeptSal = Math.max(...deptList.map(d => d[1].salary));

  const activities = [
    { text: <>Anika Rahman salary updated to {fmt(105000)}</>, time: "2h ago" },
    { text: <>April 2026 Payroll scheduled for processing</>, time: "5h ago" },
    { text: <>Kamal Hossain changed status to On Leave</>, time: "1d ago" },
    { text: <>Rima Akter joined Finance department</>, time: "2d ago" },
    { text: <>March 2026 Payroll processed successfully</>, time: "3d ago" },
  ];

  return (
    <div className="page-content">
      <div className="gradient-banner">
        <div className="banner-title">April 2026 · Payroll Period</div>
        <div className="banner-sub">Next payroll run scheduled for Apr 30, 2026</div>
        <div className="banner-metric">{fmt(totalMonthly)}</div>
        <div className="banner-meta">Monthly gross payroll · {active.length} active employees</div>
      </div>

      <div className="stats-grid">
        {[
          { icon: "👥", label: "Total Employees", value: employees.length, change: `${active.length} active`, up: true },
          { icon: "💰", label: "Monthly Payroll", value: fmt(totalMonthly), change: "↑ 2.4% vs last month", up: true },
          { icon: "📋", label: "Annual Budget", value: fmt(totalAnnual), change: "FY 2026", up: false },
          { icon: "🏢", label: "Departments", value: DEPTS.length, change: "Active divisions", up: false },
        ].map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon-wrap">{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-change ${s.up ? "up" : "neutral"}`}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid-3-1" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Recent Employees</div>
              <div className="card-subtitle">Latest additions to the team</div>
            </div>
            <button className="btn-icon" onClick={() => setPage("employees")}>View all →</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Employee</th><th>Department</th><th>Salary</th><th>Status</th></tr></thead>
              <tbody>
                {employees.slice(0, 6).map(e => (
                  <tr key={e.id}>
                    <td><div className="emp-cell"><Avatar emp={e} /><div><div className="emp-name-text">{e.name}</div><div className="emp-email">{e.role}</div></div></div></td>
                    <td><span className="badge-dept">{e.dept}</span></td>
                    <td style={{ fontWeight: 700, color: "var(--g700)" }}>{fmt(e.salary)}</td>
                    <td><StatusBadge status={e.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><div className="card-title">Payroll by Dept</div></div>
          <div style={{ padding: "16px 20px" }}>
            {deptList.map(([dept, d]) => (
              <div className="bar-row" key={dept}>
                <div className="bar-label">{dept}</div>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.round(d.salary / maxDeptSal * 100)}%` }} /></div>
                <div className="bar-value">{fmt(d.salary)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head"><div className="card-title">Recent Activity</div></div>
        <div style={{ padding: "4px 22px 10px" }}>
          {activities.map((a, i) => (
            <div className="activity-item" key={i}>
              <div className="activity-dot" />
              <div className="activity-text">{a.text}</div>
              <div className="activity-time">{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
