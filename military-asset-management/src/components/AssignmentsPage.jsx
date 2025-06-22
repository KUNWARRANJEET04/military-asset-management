// src/components/AssignmentsPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAssignmentsAPI,
  createAssignmentAPI,
  deleteAssignmentAPI
} from '../utils/api';
import {
  setAssignments,
  addAssignment,
  deleteAssignment
} from '../redux/assignmentActions';
import '../styles/Assignment.css';

const AssignmentsPage = () => {
  const dispatch = useDispatch();
  const assignments = useSelector((state) => state.assignments || []);
  const [formData, setFormData] = useState({
    assetName: '',
    assignedTo: '',
    unit: '',
    date: ''
  });

  useEffect(() => {
    fetchAssignmentsAPI().then((data) => dispatch(setAssignments(data)));
  }, [dispatch]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAssignment = await createAssignmentAPI(formData);
    if (newAssignment) {
      dispatch(addAssignment(newAssignment));
      setFormData({ assetName: '', assignedTo: '', unit: '', date: '' });
    }
  };

  const handleDelete = async (id) => {
    await deleteAssignmentAPI(id);
    dispatch(deleteAssignment(id));
  };

  return (
    <div className="assignment-container">
      <h2>Assign Assets</h2>
      <form className="assignment-form" onSubmit={handleSubmit}>
        <input
          name="assetName"
          value={formData.assetName}
          onChange={handleChange}
          placeholder="Asset Name"
          required
        />
        <input
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          placeholder="Assigned To"
          required
        />
        <input
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          placeholder="Unit"
          required
        />
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Assign</button>
      </form>

      <table className="assignment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Asset</th>
            <th>Assigned To</th>
            <th>Unit</th>
            <th>Date</th>
            <th>🗑️</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.assetName}</td>
              <td>{a.assignedTo}</td>
              <td>{a.unit}</td>
              <td>{a.date}</td>
              <td>
                <button onClick={() => handleDelete(a.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentsPage;
