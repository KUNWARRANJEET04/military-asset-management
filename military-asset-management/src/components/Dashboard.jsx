import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { netMovement, assignedAssets, expendedAssets } = useSelector(state => state.assets);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="mt-4">
        <div className="card">
          <h2 className="text-xl">Net Movement</h2>
          <p>{netMovement}</p>
        </div>
        <div className="card">
          <h2 className="text-xl">Assigned Assets</h2>
          <p>{assignedAssets}</p>
        </div>
        <div className="card">
          <h2 className="text-xl">Expended Assets</h2>
          <p>{expendedAssets}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
