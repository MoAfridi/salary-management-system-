import { useState } from "react";

const DEPTS = ["Engineering", "Marketing", "HR", "Finance", "Sales", "Operations", "Design"];

interface Employee {
  id?: number;
  name: string;
  email: string;
  dept: string;
  role: string;
  salary: number;
  status: string;
  joined: string;
  avatar?: number;
}

interface EmpModalProps {
  onClose: () => void;
  onSave: (data: Employee) => void;
  editTarget?: Employee | null;
}

export default function EmpModal({ onClose, onSave, editTarget }: EmpModalProps) {
  const isEdit = !!editTarget;
  const [form, setForm] = useState(editTarget || {
    name: "",
    email: "",
    dept: "Engineering",
    role: "",
    salary: "",
    status: "Active",
    joined: ""
  });

  function set(k: string, v: string | number) {
    setForm(p => ({ ...p, [k]: v }));
  }

  function save() {
    if (!form.name || !form.salary) return alert("Name & Salary are required");
    onSave({ ...form, salary: Number(form.salary) });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="modal-title">{isEdit ? "Edit Employee" : "Add New Employee"}</div>
            <div className="modal-sub">{isEdit ? "Update employee details" : "Fill in the details below"}</div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-field form-full">
              <label className="form-label">Full Name *</label>
              <input
                className="form-input"
                value={form.name}
                onChange={e => set("name", e.target.value)}
                placeholder="e.g. Anika Rahman"
              />
            </div>
            <div className="form-field form-full">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                value={form.email}
                onChange={e => set("email", e.target.value)}
                placeholder="email@company.com"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Department</label>
              <select
                className="form-select"
                value={form.dept}
                onChange={e => set("dept", e.target.value)}
              >
                {DEPTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Role / Title</label>
              <input
                className="form-input"
                value={form.role}
                onChange={e => set("role", e.target.value)}
                placeholder="e.g. Senior Engineer"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Annual Salary ($) *</label>
              <input
                className="form-input"
                type="number"
                value={form.salary}
                onChange={e => set("salary", e.target.value)}
                placeholder="e.g. 75000"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Join Date</label>
              <input
                className="form-input"
                type="date"
                value={form.joined}
                onChange={e => set("joined", e.target.value)}
              />
            </div>
            <div className="form-field form-full">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={form.status}
                onChange={e => set("status", e.target.value)}
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>On Leave</option>
              </select>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={save}>
            {isEdit ? "✓ Save Changes" : "＋ Add Employee"}
          </button>
        </div>
      </div>
    </div>
  );
}