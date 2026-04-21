export type Employee = {
  id: number;
  name: string;
  salary: number;
  dept: string;
  status: string;
};

export const SEED_EMP: Employee[] = [
  { id: 1, name: "Anika Rahman", salary: 105000, dept: "Engineering", status: "Active" },
  { id: 2, name: "Mehdi Hasan", salary: 78000, dept: "Marketing", status: "Active" },
  { id: 3, name: "Sadia Islam", salary: 72000, dept: "HR", status: "Active" },
];