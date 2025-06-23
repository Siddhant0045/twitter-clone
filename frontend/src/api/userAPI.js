import axios from 'axios';

const BASE_URL = 'https://twitter-clone-kfoi.onrender.com/api/users'; 

// Get all users
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Get single user by ID
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};