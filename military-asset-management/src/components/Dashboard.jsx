// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats, fetchAssets } from '../utils/api';
import { setDashboardStats } from '../redux/dashboardActions';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import * as XLSX from 'xlsx';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.dashboard);
  const [assets, setAssets] = useState([]);
  const [filterBase, setFilterBase] = useState('');
  const [filterType, setFilterType] = useState('');
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF4C4C'];
const pieData = [
  { name: 'Purchases', value: stats.purchaseTotal || 0 },
  { name: 'Transfer In', value: stats.transferInTotal || 0 },
  { name: 'Transfer Out', value: stats.transferOutTotal || 0 },
  { name: 'Assigned', value: stats.assignedTotal || 0 },
];
const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet([stats]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dashboard Stats');
  XLSX.writeFile(workbook, 'dashboard_stats.xlsx');
};
  useEffect(() => {
    fetchAssets().then(setAssets);
  }, []);

  useEffect(() => {
    fetchDashboardStats({ base: filterBase, type: filterType }).then((data) => {
      dispatch(setDashboardStats(data));
    });
  }, [filterBase, filterType, dispatch]);

  const uniqueBases = [...new Set(assets.map((a) => a.base))];
  const uniqueTypes = [...new Set(assets.map((a) => a.type))];

  const chartData = [
    { name: 'Purchases', value: stats.purchaseTotal || 0 },
    { name: 'Transfer In', value: stats.transferInTotal || 0 },
    { name: 'Transfer Out', value: stats.transferOutTotal || 0 },
    { name: 'Assigned', value: stats.assignedTotal || 0 },
  ];

  const assetValue = (stats.closingBalance || 0) * 1000;

  return (
    <div className="dashboard-container">
      <h2>Military Asset Dashboard</h2>

      <div className="dashboard-filters">
        <label>
          Filter by Base:
          <select value={filterBase} onChange={(e) => setFilterBase(e.target.value)}>
            <option value="">All Bases</option>
            {uniqueBases.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>

        <label>
          Filter by Type:
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            {uniqueTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="stats-grid">
        <div className="card">Opening Balance: {stats.openingBalance}</div>
        <div className="card">Purchases: {stats.purchaseTotal}</div>
        <div className="card">Transfer In: {stats.transferInTotal}</div>
        <div className="card">Transfer Out: {stats.transferOutTotal}</div>
        <div className="card">Net Movement: {stats.netMovement}</div>
        <div className="card">Assigned: {stats.assignedTotal}</div>
        <div className="card closing-balance">
          Closing Balance: {stats.closingBalance}
          <br />
          💰 ₹{assetValue.toLocaleString()}
        </div>
      </div>
      <div className="chart-container">
  <h3>Distribution Pie Chart</h3>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>
      <div className="chart-container">
        <h3>Asset Movement Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#007bff" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <button onClick={exportToExcel} className="download-btn">
  ⬇️ Download Excel
</button>
    </div>
      
  );
};

export default Dashboard;
