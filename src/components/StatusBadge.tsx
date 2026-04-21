import React from 'react';
  
interface StatusBadgeProps {  
  status: string;  
}  
  
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {  
  const cls = status === "Active" ? "badge-active" : status === "Inactive" ? "badge-inactive" : "badge-leave";  
  return <span className={`badge ${cls}`}>{status}</span>;  
};  
  
export default StatusBadge; 
