import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPurchases, addPurchase } from '../redux/purchaseActions';
import { fetchPurchasesAPI, createPurchaseAPI } from '../utils/api';
import '../styles/Purchases.css';

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases || []);

  const [formData, setFormData] = useState({
    assetName: '',
    type: '',
    base: '',
    quantity: '',
    date: ''
  });

  const [filter, setFilter] = useState({
    type: '',
    date: ''
  });

  useEffect(() => {
    fetchPurchasesAPI().then((data) => dispatch(setPurchases(data)));
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        assetName: formData.assetName,
        quantity: formData.quantity,
        date: formData.date
      };
      const newPurchase = await createPurchaseAPI(payload);

      // Include local-only fields for display
      const fullPurchase = {
        ...newPurchase,
        type: formData.type,
        base: formData.base
      };

      dispatch(addPurchase(fullPurchase));
      setFormData({ assetName: '', type: '', base: '', quantity: '', date: '' });
    } catch (error) {
      console.error('❌ Failed to create purchase:', error);
    }
  };

  const filteredPurchases = purchases.filter((p) => {
    return (
      (filter.type === '' || p.type === filter.type) &&
      (filter.date === '' || p.date === filter.date)
    );
  });

  return (
    <div className="purchases-container">
      <h2 className="purchases-title">Record a New Purchase</h2>
      <form className="purchase-form" onSubmit={handleSubmit}>
        <input name="assetName" value={formData.assetName} onChange={handleChange} placeholder="Asset Name" required />
        <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" required />
        <input name="base" value={formData.base} onChange={handleChange} placeholder="Base" required />
        <input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required type="number" />
        <input name="date" value={formData.date} onChange={handleChange} type="date" required />
        <button type="submit">Add Purchase</button>
      </form>

      <h2 className="purchases-title">Purchases History</h2>
      <div className="purchase-filters">
        <input name="date" value={filter.date} onChange={handleFilterChange} type="date" />
        <input name="type" value={filter.type} onChange={handleFilterChange} placeholder="Filter by Type" />
      </div>

      <table className="purchase-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Asset Name</th>
            <th>Type</th>
            <th>Base</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredPurchases.map((purchase, index) => (
            <tr key={purchase.id || index}>
              <td>{purchase.id}</td>
              <td>{purchase.assetName}</td>
              <td>{purchase.type || '-'}</td>
              <td>{purchase.base || '-'}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Purchases;
