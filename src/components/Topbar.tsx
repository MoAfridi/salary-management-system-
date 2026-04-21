import React from 'react';

interface TopbarProps {
  page: string;
  action?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ page, action }) => {
  const titles = {
    dashboard: "Dashboard",
    employees: "Employees",
    payroll: "Payroll",
    reports: "Reports",
    settings: "Settings"
  };
  const actions = {
    employees: <button className="btn-primary" onClick={action}>＋ Add Employee</button>,
    payroll: <button className="btn-primary" onClick={action}>▶ Run Payroll</button>,
  };
  return (
    <header className="topbar">
      <div>
        <div className="page-heading">{titles[page as keyof typeof titles]}</div>
        <div className="breadcrumb">PayFlow · {titles[page as keyof typeof titles]}</div>
      </div>
      <div className="topbar-right">
        <div className="topbar-btn" style={{ position: "relative" }}>🔔<span className="notif-dot" /></div>
        <div className="topbar-btn">⚙</div>
        {actions[page as keyof typeof actions]}
      </div>
    </header>
  );
};

export default Topbar;