import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { PAYROLL_HIST, SEED_EMP } from "./data/seed";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [employees] = useState(SEED_EMP);
  const [payrollHist] = useState(PAYROLL_HIST);
  const [showEmpModal, setShowEmpModal] = useState(false);
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [showRunPayrollModal, setShowRunPayrollModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const addEmployee = () => setShowEmpModal(true);
  const runPayroll = () => setShowRunPayrollModal(true);
  const viewPayslip = (emp) => {
    setSelectedEmp(emp);
    setShowPayslipModal(true);
  };

  const getAction = () => {
    if (page === "employees") return addEmployee;
    if (page === "payroll") return runPayroll;
    return undefined;
  };

  return (
    <div className="layout">
      <Sidebar page={page} setPage={setPage} empCount={employees.length} />

      <div className="main">
        <Topbar page={page} action={getAction()} />

        <div className="page-content">
          {page === "dashboard" && (
            <Dashboard employees={employees} setPage={setPage} viewPayslip={viewPayslip} />
          )}

          {page === "employees" && (
            <div className="card">
              <div className="card-head">
                <div>
                  <div className="card-title">Employees</div>
                  <div className="card-subtitle">Manage your team members</div>
                </div>
              </div>
              <div className="toolbar">
                <div className="search-wrap">
                  <span className="search-icon">🔍</span>
                  <input type="text" className="search-input" placeholder="Search employees..." />
                </div>
                <select className="filter-select">
                  <option>All Departments</option>
                  <option>Engineering</option>
                  <option>Design</option>
                  <option>Marketing</option>
                </select>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Role</th>
                      <th>Salary</th>
                      <th>Status</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(emp => (
                      <tr key={emp.id}>
                        <td>
                          <div className="emp-cell">
                            <div className="avatar" style={{ background: emp.avatar }}>
                              {emp.initials}
                            </div>
                            <div>
                              <div className="emp-name-text">{emp.name}</div>
                              <div className="emp-email">{emp.email}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge badge-dept">{emp.dept}</span></td>
                        <td>{emp.role}</td>
                        <td>{emp.fmtSalary}</td>
                        <td><span className={`badge badge-${emp.status}`}>{emp.status}</span></td>
                        <td>{emp.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {page === "payroll" && (
            <div className="grid-2">
              <div className="card">
                <div className="card-head">
                  <div>
                    <div className="card-title">Payroll History</div>
                    <div className="card-subtitle">Recent payroll runs</div>
                  </div>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Period</th>
                        <th>Employees</th>
                        <th>Total Paid</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payrollHist.map(p => (
                        <tr key={p.id}>
                          <td>{p.date}</td>
                          <td>{p.period}</td>
                          <td>{p.employees}</td>
                          <td>{p.total}</td>
                          <td><span className={`badge badge-${p.status}`}>{p.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card">
                <div className="card-head">
                  <div>
                    <div className="card-title">Payroll Summary</div>
                    <div className="card-subtitle">This month's overview</div>
                  </div>
                </div>
                <div className="mini-kpi-grid">
                  <div className="mini-kpi">
                    <div className="mini-kpi-label">Total Payroll</div>
                    <div className="mini-kpi-value">$127,500</div>
                  </div>
                  <div className="mini-kpi">
                    <div className="mini-kpi-label">Avg Salary</div>
                    <div className="mini-kpi-value">$4,250</div>
                  </div>
                  <div className="mini-kpi">
                    <div className="mini-kpi-label">Tax Deducted</div>
                    <div className="mini-kpi-value">$18,375</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {page === "reports" && (
            <div className="card">
              <div className="card-head">
                <div>
                  <div className="card-title">Reports</div>
                  <div className="card-subtitle">Analytics and insights</div>
                </div>
              </div>
              <div className="empty-state">
                <div className="empty-icon">📊</div>
                <div>Reports coming soon...</div>
              </div>
            </div>
          )}

          {page === "settings" && (
            <div className="card">
              <div className="card-head">
                <div>
                  <div className="card-title">Settings</div>
                  <div className="card-subtitle">System configuration</div>
                </div>
              </div>
              <div className="empty-state">
                <div className="empty-icon">⚙</div>
                <div>Settings coming soon...</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showEmpModal && (
        <div className="modal-overlay" onClick={() => setShowEmpModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <div className="modal-title">Add Employee</div>
                <div className="modal-sub">Create a new team member</div>
              </div>
              <button className="modal-close" onClick={() => setShowEmpModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-input" />
                </div>
                <div className="form-field">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-input" />
                </div>
                <div className="form-field form-full">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" />
                </div>
                <div className="form-field">
                  <label className="form-label">Department</label>
                  <select className="form-select">
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Role</label>
                  <input type="text" className="form-input" />
                </div>
                <div className="form-field">
                  <label className="form-label">Salary</label>
                  <input type="number" className="form-input" />
                </div>
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn-secondary" onClick={() => setShowEmpModal(false)}>Cancel</button>
              <button className="btn-primary">Add Employee</button>
            </div>
          </div>
        </div>
      )}

      {showPayslipModal && selectedEmp && (
        <div className="modal-overlay" onClick={() => setShowPayslipModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <div className="modal-title">Payslip - {selectedEmp.name}</div>
                <div className="modal-sub">November 2024</div>
              </div>
              <button className="modal-close" onClick={() => setShowPayslipModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="payslip-section-title">Earnings</div>
              <div className="payslip-row-item">
                <span className="payslip-label">Basic Salary</span>
                <span className="payslip-val">{selectedEmp.fmtSalary}</span>
              </div>
              <div className="payslip-row-item">
                <span className="payslip-label">HRA</span>
                <span className="payslip-val">$1,200</span>
              </div>
              <div className="payslip-row-item">
                <span className="payslip-label">Conveyance</span>
                <span className="payslip-val">$200</span>
              </div>

              <div className="payslip-section-title">Deductions</div>
              <div className="payslip-row-item">
                <span className="payslip-label payslip-deduct">Provident Fund</span>
                <span className="payslip-val payslip-deduct">$300</span>
              </div>
              <div className="payslip-row-item">
                <span className="payslip-label payslip-deduct">Tax</span>
                <span className="payslip-val payslip-deduct">$450</span>
              </div>

              <div className="payslip-net">
                <span className="payslip-net-label">Net Pay</span>
                <span className="payslip-net-val">$4,650</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRunPayrollModal && (
        <div className="modal-overlay" onClick={() => setShowRunPayrollModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <div className="modal-title">Run Payroll</div>
                <div className="modal-sub">Process salary payments for November 2024</div>
              </div>
              <button className="modal-close" onClick={() => setShowRunPayrollModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label className="form-label">Payroll Period</label>
                <input type="text" className="form-input" value="November 2024" readOnly />
              </div>
              <div className="form-field">
                <label className="form-label">Payment Date</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-field">
                <label className="form-label">Total Amount</label>
                <input type="text" className="form-input" value="$127,500" readOnly />
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn-secondary" onClick={() => setShowRunPayrollModal(false)}>Cancel</button>
              <button className="btn-primary">Run Payroll</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}