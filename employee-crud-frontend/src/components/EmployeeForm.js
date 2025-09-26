import React, { useEffect, useState } from "react";
import { createEmployee, updateEmployee } from "../api";

const EmployeeForm = ({ fetchEmployees, editingEmployee, setEditingEmployee }) => {
  const [formData, setFormData] = useState({ name: "", email: "", position: "" });

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name,
        email: editingEmployee.email,
        position: editingEmployee.position,
      });
    } else {
      setFormData({ name: "", email: "", position: "" });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingEmployee) {
      await updateEmployee(editingEmployee.id, formData);
      setEditingEmployee(null);
    } else {
      await createEmployee(formData);
    }
    setFormData({ name: "", email: "", position: "" });
    fetchEmployees();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        required
      />
      <button type="submit">{editingEmployee ? "Update" : "Add"} Employee</button>
    </form>
  );
};

export default EmployeeForm;
