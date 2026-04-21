import React from "react";

interface SidebarProps {
  page: string;
  setPage: (page: string) => void;
  empCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ page, setPage, empCount }) => {
  const nav = [
    { key: "dashboard", icon: "⬡", label: "Dashboard" },
    { key: "employees", icon: "◯", label: "Employees", badge: empCount },
    { key: "payroll", icon: "▦", label: "Payroll" },
    { key: "reports", icon: "◫", label: "Reports" },
    { key: "settings", icon: "⚙", label: "Settings" },
  ];
  return (
    <aside className="sidebar">
      <div className="logo-area">
        <div className="logo-mark">
          <div className="logo-icon">💼</div>
          <div>
            <div className="logo-text">PayFlow</div>
            <div className="logo-sub">Salary OS</div>
          </div>
        </div>
      </div>
      <div className="nav-section">
        <div className="nav-label">Main Menu</div>
        {nav.map(n => (
          <div key={n.key} className={`nav-item${page === n.key ? " active" : ""}`} onClick={() => setPage(n.key)}>
            <span className="nav-icon">{n.icon}</span>
            <span style={{ flex: 1 }}>{n.label}</span>
            {n.badge && <span className="nav-badge">{n.badge}</span>}
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">A</div>
          <div>
            <div className="user-name">Admin</div>
            <div className="user-role">HR Manager</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
