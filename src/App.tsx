import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import EmpModal from "./components/EmpModal";
import Payroll from "./components/Payroll";
import PayslipModal from "./components/PayslipModal";
import Reports from "./components/Reports";
import RunPayrollModal from "./components/RunPayrollModal";
import Settings from "./components/Settings";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { SEED_EMP, type Employee } from "./data/seed";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [employees, setEmployees] = useState(SEED_EMP);
  const [modal, setModal] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<Employee | null>(null);

  function openModal(type: string) {
    setModal(type);
  }

  function closeModal() {
    setModal(null);
    setEditTarget(null);
  }

  function saveEmployee(data: Omit<Employee, 'id' | 'avatar'> & { id?: number; avatar?: number }) {
    if (editTarget) {
      setEmployees(prev => prev.map(e => e.id === editTarget.id ? { ...e, ...data } : e));
    } else {
      setEmployees(prev => [...prev, { ...data, id: Date.now(), avatar: Math.floor(Math.random() * 8) }]);
    }
    closeModal();
  }

  const topbarAction = page === "employees" ? () => openModal("emp") : page === "payroll" ? () => openModal("payroll") : undefined;

  return (
    <div className="layout">
      <Sidebar page={page} setPage={setPage} empCount={employees.length} />

      <div className="main">
        <Topbar page={page} action={topbarAction} />

        {page === "dashboard" && <Dashboard employees={employees} setPage={setPage} />}
        {page === "employees" && <Employees employees={employees} setEmployees={setEmployees} openModal={openModal} setEditTarget={setEditTarget} />}
        {page === "payroll" && <Payroll employees={employees} />}
        {page === "reports" && <Reports employees={employees} />}
        {page === "settings" && <Settings />}
      </div>

      {modal === "emp" && <EmpModal onClose={closeModal} onSave={saveEmployee} editTarget={editTarget} />}
      {modal === "payslip" && editTarget && <PayslipModal emp={editTarget} onClose={closeModal} />}
      {modal === "payroll" && <RunPayrollModal employees={employees} onClose={closeModal} />}
    </div>
  );
}