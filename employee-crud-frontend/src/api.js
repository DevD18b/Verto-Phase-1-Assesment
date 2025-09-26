import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getEmployees = () => API.get("/employees");
export const getEmployee = (id) => API.get(`/employees/${id}`);
export const createEmployee = (data) => API.post("/employees", data);
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);
