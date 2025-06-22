// import axios from 'axios';

// const BASE_URL = 'http://localhost:4000/api';

// export const fetchAssets = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/assets`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching assets:', error);
//     return [];
//   }
// };

// export const fetchPurchasesAPI = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/purchases`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching purchases:', error);
//     return [];
//   }
// };

// export const createPurchaseAPI = async (purchase) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/purchases`, purchase);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating purchase:', error);
//     return null;
//   }
// };

// export const deletePurchaseAPI = async (id) => {
//   try {
//     await axios.delete(`${BASE_URL}/purchases/${id}`);
//   } catch (error) {
//     console.error('Error deleting purchase:', error);
//     throw error;
//   }
// };

// // export const updatePurchaseAPI = async (id, updatedData) => {
// //   try {
// //     const response = await axios.put(`${BASE_URL}/purchases/${id}`, updatedData);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error updating purchase:', error);
// //     throw error;
// //   }
// // };

// export const updatePurchaseAPI = async (id, updatedData) => {
//   const res = await fetch(`http://localhost:4000/api/purchases/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(updatedData),
//   });
//   if (!res.ok) throw new Error('Failed to update purchase');
//   return await res.json();
// };

// const newPurchase = await createPurchaseAPI(formData);
// if (newPurchase) {
//   dispatch(addPurchase(newPurchase));
// }

// src/utils/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

// Fetch all assets
export const fetchAssets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/assets`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching assets:', error);
    return []; // Return empty array on failure
  }
};

// Fetch all purchases
export const fetchPurchasesAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/purchases`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching purchases:', error);
    return []; // Always return an array to avoid UI crash
  }
};

// Create a new purchase
export const createPurchaseAPI = async (purchase) => {
  try {
    const response = await axios.post(`${BASE_URL}/purchases`, purchase);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating purchase:', error);
    return null; // Caller should check if result is null
  }
};

// Delete a purchase by ID
export const deletePurchaseAPI = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/purchases/${id}`);
    return res.status === 200;
  } catch (error) {
    console.error('❌ Error deleting purchase:', error);
    return false; // Return false to signal failure
  }
};

// // Update an existing purchase
// export const updatePurchaseAPI = async (id, updatedData) => {
//   try {
//     const res = await axios.put(`${BASE_URL}/purchases/${id}`, updatedData);
//     return res.data;
//   } catch (error) {
//     console.error('❌ Error updating purchase:', error);
//     return null;
//   }
// };

export const updatePurchaseAPI = async (id, updatedData) => {
  const res = await fetch(`http://localhost:4000/api/purchases/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error('Failed to update purchase');
  return await res.json();
};
export const fetchTransfersAPI = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err) {
    console.error('Error fetching transfers:', err);
    return [];
  }
};

export const createTransferAPI = async (transfer) => {
  try {
    const res = await axios.post(BASE_URL, transfer);
    return res.data;
  } catch (err) {
    console.error('Error creating transfer:', err);
    return null;
  }
};

export const deleteTransferAPI = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (err) {
    console.error('Error deleting transfer:', err);
    throw err;
  }
};

export const updateTransferAPI = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data;
  } catch (err) {
    console.error('Error updating transfer:', err);
    throw err;
  }
};

// ASSIGNMENTS
export const fetchAssignmentsAPI = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/assignments');
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching assignments:', error);
    return [];
  }
};

export const createAssignmentAPI = async (assignment) => {
  try {
    const response = await fetch('http://localhost:4000/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assignment)
    });
    return await response.json();
  } catch (error) {
    console.error('❌ Error creating assignment:', error);
    return null;
  }
};

export const deleteAssignmentAPI = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/api/assignments/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete assignment');
  } catch (error) {
    console.error('❌ Error deleting assignment:', error);
  }
};

// const API_BASE = 'http://localhost:4000/api';

// export const fetchDashboardStats = async (filters = {}) => {
//   const query = new URLSearchParams(filters).toString();
//   const res = await axios.get(`${API_BASE}/dashboard?${query}`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`
//     }
//   });
//   return res.data;
// };

export const fetchDashboardStats = async (filters = {}) => {
  const token = localStorage.getItem('token'); // ✅ Get from storage

  const query = new URLSearchParams(filters).toString();

  const res = await axios.get(`http://localhost:4000/api/dashboard?${query}`, {
    headers: {
      Authorization: `Bearer ${token}` // ✅ Send in Authorization header
    }
  });

  return res.data;
};