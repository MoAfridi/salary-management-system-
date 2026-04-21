export interface Employee {
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

export interface PayrollHistory {
  id: number;
  month: string;
  gross: number;
  net: number;
  count: number;
  date: string;
  status: string;
}

export const AVATARS = ["#1e9952","#177d42","#136234","#3db370","#0e4826","#73c997","#1a5c22","#27a035"];

export const DEPTS = ["Engineering","Marketing","HR","Finance","Sales","Operations","Design"];

export const ROLES = {
  Engineering:["Senior Engineer","Junior Engineer","Tech Lead","DevOps","QA Engineer"],
  Marketing:["Brand Manager","Content Lead","Growth Marketer","SEO Specialist"],
  HR:["HR Manager","Recruiter","HR Analyst","People Ops"],
  Finance:["Financial Analyst","Accountant","CFO","Payroll Specialist"],
  Sales:["Sales Executive","Account Manager","Sales Director","BDR"],
  Operations:["Operations Manager","Business Analyst","Project Manager"],
  Design:["UI Designer","UX Researcher","Creative Director","Product Designer"]
};

export const SEED_EMP: Employee[] = [
  {id:1,name:"Anika Rahman",email:"a.rahman@payflow.io",dept:"Engineering",role:"Tech Lead",salary:105000,status:"Active",joined:"2020-03-15",avatar:0},
  {id:2,name:"Mehdi Hasan",email:"m.hasan@payflow.io",dept:"Marketing",role:"Brand Manager",salary:78000,status:"Active",joined:"2021-07-01",avatar:1},
  {id:3,name:"Sadia Islam",email:"s.islam@payflow.io",dept:"HR",role:"HR Manager",salary:72000,status:"Active",joined:"2019-11-10",avatar:2},
  {id:4,name:"Rafiq Uddin",email:"r.uddin@payflow.io",dept:"Finance",role:"Accountant",salary:64000,status:"Inactive",joined:"2018-05-20",avatar:3},
  {id:5,name:"Nusrat Jahan",email:"n.jahan@payflow.io",dept:"Engineering",role:"Junior Engineer",salary:56000,status:"Active",joined:"2023-01-12",avatar:4},
  {id:6,name:"Tanvir Ahmed",email:"t.ahmed@payflow.io",dept:"Sales",role:"Sales Director",salary:88000,status:"Active",joined:"2021-03-08",avatar:5},
  {id:7,name:"Farida Begum",email:"f.begum@payflow.io",dept:"Design",role:"UI Designer",salary:70000,status:"Active",joined:"2022-06-15",avatar:6},
  {id:8,name:"Kamal Hossain",email:"k.hossain@payflow.io",dept:"Operations",role:"Project Manager",salary:82000,status:"On Leave",joined:"2020-09-01",avatar:7},
  {id:9,name:"Rima Akter",email:"r.akter@payflow.io",dept:"Finance",role:"Financial Analyst",salary:74000,status:"Active",joined:"2022-01-20",avatar:1},
  {id:10,name:"Shakil Khan",email:"s.khan@payflow.io",dept:"Sales",role:"Account Manager",salary:61000,status:"Active",joined:"2023-04-10",avatar:0},
];

export const PAYROLL_HIST: PayrollHistory[] = [
  {id:1,month:"March 2026",gross:750000,net:637500,count:9,date:"2026-03-31",status:"Paid"},
  {id:2,month:"February 2026",gross:750000,net:637500,count:9,date:"2026-02-28",status:"Paid"},
  {id:3,month:"January 2026",gross:736000,net:625600,count:8,date:"2026-01-31",status:"Paid"},
  {id:4,month:"December 2025",gross:736000,net:625600,count:8,date:"2025-12-31",status:"Paid"},
];

export function fmt(n: number): string {
  return "$"+Math.round(n).toLocaleString();
}

export function initials(name: string): string {
  return name.split(" ").map(p=>p[0]).join("").slice(0,2).toUpperCase();
}

export function getAvatar(emp: Employee): string {
  return AVATARS[emp.avatar%AVATARS.length];
} 
