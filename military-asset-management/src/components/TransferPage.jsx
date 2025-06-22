import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTransfersAPI,
  createTransferAPI,
  deleteTransferAPI
} from '../utils/api';
import {
  setTransfers,
  addTransfer,
  deleteTransfer
} from '../redux/transferActions';
import '../styles/Transfer.css';

const TransferPage = () => {
  const dispatch = useDispatch();
  const transfers = useSelector((state) => state.transfers || []);
  const [formData, setFormData] = useState({
    assetName: '',
    fromBase: '',
    toBase: '',
    date: ''
  });

  useEffect(() => {
    fetchTransfersAPI().then((data) => dispatch(setTransfers(data)));
  }, [dispatch]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransfer = await createTransferAPI(formData);
    if (newTransfer) {
      dispatch(addTransfer(newTransfer));
      setFormData({ assetName: '', fromBase: '', toBase: '', date: '' });
    }
  };

  const handleDelete = async (id) => {
    await deleteTransferAPI(id);
    dispatch(deleteTransfer(id));
  };

  return (
    <div className="transfer-container">
      <h2>Transfer Asset</h2>
      <form className="transfer-form" onSubmit={handleSubmit}>
        <input name="assetName" value={formData.assetName} onChange={handleChange} placeholder="Asset Name" required />
        <input name="fromBase" value={formData.fromBase} onChange={handleChange} placeholder="From Base" required />
        <input name="toBase" value={formData.toBase} onChange={handleChange} placeholder="To Base" required />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <button type="submit">Transfer</button>
      </form>

      <table className="transfer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Asset</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>🗑️</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.assetName}</td>
              <td>{t.fromBase}</td>
              <td>{t.toBase}</td>
              <td>{t.date}</td>
              <td><button onClick={() => handleDelete(t.id)}>❌</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransferPage;
