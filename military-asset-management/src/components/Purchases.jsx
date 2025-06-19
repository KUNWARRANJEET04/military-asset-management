import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPurchases,
  addPurchase,
  deletePurchase,
  updatePurchase,
} from '../redux/purchaseActions';
import {
  fetchPurchasesAPI,
  createPurchaseAPI,
  deletePurchaseAPI,
  updatePurchaseAPI,
} from '../utils/api';
import '../styles/Purchases.css';

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases || []);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    base: '',
    quantity: '',
    date: '',
  });

  const [filter, setFilter] = useState({
    type: '',
    date: '',
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPurchasesAPI()
      .then((data) => dispatch(setPurchases(data)))
      .catch((err) => console.error('Failed to fetch purchases:', err));
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const [editingId, setEditingId] = useState(null); // track which row is being edited


 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editingId) {
      const updated = await updatePurchaseAPI(editingId, formData);
      dispatch(updatePurchase(updated));
      setEditingId(null); // reset edit mode
    } else {
      const newPurchase = await createPurchaseAPI(formData);
      dispatch(addPurchase(newPurchase));
    }
    setFormData({ name: '', type: '', base: '', quantity: '', date: '' });
  } catch (error) {
    console.error('❌ Failed to submit purchase:', error);
  }
};


  const handleDelete = async (id) => {
    try {
      await deletePurchaseAPI(id);
      dispatch(deletePurchase(id));
    } catch (error) {
      console.error('❌ Failed to delete purchase:', error);
    }
  };

  const handleEdit = (purchase) => {
    setFormData({
      name: purchase.name,
      type: purchase.type,
      base: purchase.base,
      quantity: purchase.quantity,
      date: purchase.date,
    });
    setEditId(purchase.id);
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
        <button type="submit">{editingId ? 'Update Purchase' : 'Add Purchase'}</button>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Asset Name"
          required
        />
        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type"
          required
        />
        <input
          name="base"
          value={formData.base}
          onChange={handleChange}
          placeholder="Base"
          required
        />
        <input
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          type="number"
          required
        />
        <input
          name="date"
          value={formData.date}
          onChange={handleChange}
          type="date"
          required
        />
        <button type="submit">{editId ? 'Update Purchase' : 'Add Purchase'}</button>
      </form>

      <h2 className="purchases-title">Purchases History</h2>
      <div className="purchase-filters">
        <input
          name="date"
          value={filter.date}
          onChange={handleFilterChange}
          type="date"
        />
        <input
          name="type"
          value={filter.type}
          onChange={handleFilterChange}
          placeholder="Filter by Type"
        />
      </div>

      <table className="purchase-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Base</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPurchases
  .filter((purchase) => purchase !== null && purchase !== undefined)
  .map((purchase, index) => (
    <tr key={purchase.id || index}>
      <td>{purchase.id}</td>
      <td>{purchase.name}</td>
      <td>{purchase.type}</td>
      <td>{purchase.base}</td>
      <td>{purchase.quantity}</td>
      <td>{purchase.date}</td>
      <td>
        <button onClick={() => handleEdit(purchase)}>✏️</button>
        <button onClick={() => handleDelete(purchase.id)}>🗑️</button>
      </td>
    </tr>
))}
<td>
  <button onClick={() => handleDelete(purchases.id)}>🗑️</button>
  <button onClick={() => {
    setEditingId(purchases.id);
    setFormData({
      name: purchases.name,
      type: purchases.type,
      base: purchases.base,
      quantity: purchases.quantity,
      date: purchases.date
    });
  }}>✏️</button>
</td>

        </tbody>
      </table>
    </div>
  );
};

export default Purchases;
