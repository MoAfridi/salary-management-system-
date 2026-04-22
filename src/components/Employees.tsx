import { useMemo, useState } from "react";
import { fmt } from "../data/seed";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";

const DEPTS = ["Engineering", "Marketing", "HR", "Finance", "Sales", "Operations", "Design"];

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

interface EmployeesProps {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  openModal: (type: string) => void;
  setEditTarget: (employee: Employee) => void;
}

export default function Employees({ employees, setEmployees, openModal, setEditTarget }: EmployeesProps) {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => employees.filter(e => {
    const q = search.toLowerCase();
    const matchQ = !q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.role.toLowerCase().includes(q);
    const matchD = dept === "All" || e.dept === dept;
    const matchS = status === "All" || e.status === status;
    return matchQ && matchD && matchS;
  }), [employees, search, dept, status]);

  function del(id: number) {
    if (window.confirm("Remove this employee?")) {
      setEmployees(employees.filter(e => e.id !== id));
    }
  }

  return (
    <div className="page-content">
      <div className="card">
        <div className="toolbar">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Search by name, role, email…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={dept}
            onChange={e => setDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            {DEPTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select
            className="filter-select"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>On Leave</option>
          </select>
          <div style={{ marginLeft: "auto", fontSize: 12, color: "var(--gray400)", fontWeight: 500 }}>
            {filtered.length} of {employees.length} employees
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Role</th>
                <th>Annual Salary</th>
                <th>Monthly</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <div className="empty-state">
                      <div className="empty-icon">🔎</div>
                      No employees match your filters
                    </div>
                  </td>
                </tr>
              )}
              {filtered.map(e => (
                <tr key={e.id}>
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
                  <td style={{ color: "var(--gray600)", fontSize: 13 }}>{e.role}</td>
                  <td style={{ fontWeight: 700, color: "var(--g700)", fontSize: 14 }}>{fmt(e.salary)}</td>
                  <td style={{ color: "var(--gray500)", fontSize: 13 }}>{fmt(e.salary / 12)}</td>
                  <td style={{ color: "var(--gray400)", fontSize: 12 }}>{e.joined || "—"}</td>
                  <td><StatusBadge status={e.status} /></td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className="btn-icon"
                        onClick={() => { setEditTarget(e); openModal("payslip"); }}
                      >
                        Payslip
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => { setEditTarget(e); openModal("emp"); }}
                      >
                        Edit
                      </button>
                      <button className="btn-danger" onClick={() => del(e.id)}>✕</button>
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