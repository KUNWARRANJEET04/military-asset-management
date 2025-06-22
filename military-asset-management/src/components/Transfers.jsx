// src/components/Transfers.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTransfers, addTransfer, deleteTransfer, updateTransfer } from '../redux/transferActions';
import { fetchTransfersAPI, createTransferAPI, deleteTransferAPI, updateTransferAPI } from '../utils/api';
import '../styles/Transfers.css';

const Transfers = () => {
  const dispatch = useDispatch();
  const transfers = useSelector((state) => state.transfers || []);

  const [formData, setFormData] = useState({
    assetName: '',
    fromBase: '',
    toBase: '',
    quantity: '',
    date: ''
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTransfersAPI().then(data => dispatch(setTransfers(data)));
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      const updated = await updateTransferAPI(editingId, formData);
      dispatch(updateTransfer(updated));
      setEditingId(null);
    } else {
      const newTransfer = await createTransferAPI(formData);
      dispatch(addTransfer(newTransfer));
    }
    setFormData({ assetName: '', fromBase: '', toBase: '', quantity: '', date: '' });
  };

  const handleDelete = async (id) => {
    await deleteTransferAPI(id);
    dispatch(deleteTransfer(id));
  };

  const handleEdit = (transfer) => {
    setEditingId(transfer.id);
    setFormData(transfer);
  };

  return (
    <div className="transfers-container">
      <h2>Record a Transfer</h2>
      <form onSubmit={handleSubmit} className="transfer-form">
        <input name="assetName" value={formData.assetName} onChange={handleChange} placeholder="Asset Name" required />
        <input name="fromBase" value={formData.fromBase} onChange={handleChange} placeholder="From Base" required />
        <input name="toBase" value={formData.toBase} onChange={handleChange} placeholder="To Base" required />
        <input name="quantity" value={formData.quantity} onChange={handleChange} type="number" placeholder="Quantity" required />
        <input name="date" value={formData.date} onChange={handleChange} type="date" required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Transfer</button>
      </form>

      <h2>Transfers History</h2>
      <table className="transfer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Asset</th>
            <th>From</th>
            <th>To</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.assetName}</td>
              <td>{t.fromBase}</td>
              <td>{t.toBase}</td>
              <td>{t.quantity}</td>
              <td>{t.date}</td>
              <td>
                <button onClick={() => handleEdit(t)}>✏️</button>
                <button onClick={() => handleDelete(t.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transfers;
