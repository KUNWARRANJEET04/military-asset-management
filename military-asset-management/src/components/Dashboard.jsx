import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAssets } from '../redux/actions';
import { fetchAssets } from '../utils/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.assets) || [];
  const [filterBase, setFilterBase] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    fetchAssets().then((data) => {
      dispatch(setAssets(data));
    });
  }, [dispatch]);

  const filteredAssets = assets.filter(
    (asset) =>
      (filterBase === '' || asset.base === filterBase) &&
      (filterType === '' || asset.type === filterType)
  );

  const uniqueBases = [...new Set(assets.map((asset) => asset.base))];
  const uniqueTypes = [...new Set(assets.map((asset) => asset.type))];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Assets Dashboard</h1>

      <div className="dashboard-filters">
        <label>
          Base:
          <select
            value={filterBase}
            onChange={(e) => setFilterBase(e.target.value)}
          >
            <option value="">All</option>
            {uniqueBases.map((base) => (
              <option key={base} value={base}>
                {base}
              </option>
            ))}
          </select>
        </label>

        <label>
          Type:
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="dashboard-table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Base</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.base}</td>
                <td>{asset.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
