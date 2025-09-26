import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id);
      fetchEmployees();
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <EmployeeForm
        fetchEmployees={fetchEmployees}
        editingEmployee={editingEmployee}
        setEditingEmployee={setEditingEmployee}
      />
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>
                <button onClick={() => setEditingEmployee(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
