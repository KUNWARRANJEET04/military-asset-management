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

// Update an existing purchase
export const updatePurchaseAPI = async (id, updatedData) => {
  try {
    const res = await axios.put(`${BASE_URL}/purchases/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.error('❌ Error updating purchase:', error);
    return null;
  }
};
