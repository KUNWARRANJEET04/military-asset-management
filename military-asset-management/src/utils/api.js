// frontend/src/utils/api.js
import axios from 'axios';

export const fetchAssets = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/assets');
    return response.data;
  } catch (error) {
    console.error('Error fetching assets:', error);
    return [];
  }
};
