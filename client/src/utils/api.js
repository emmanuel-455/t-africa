// services/api.js
import axios from 'axios';

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',  // Set the base URL for the API
  timeout: 10000,  // Set a timeout limit for the requests
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch products with pagination.
 * @param {number} page - The page number to fetch.
 * @returns {Promise<Array>} - A promise that resolves to the list of products.
 */
export const fetchProducts = async (page) => {
  try {
    const response = await axiosInstance.get(`https://dummyjson.com/products?skip=${(page - 1) * 30}`);
    return response.data.products;  // Return the products data
  } catch (err) {
    console.error('Failed to fetch products:', err);
    throw err;  // Throw the error to be handled in the component
  }
};

/**
 * Additional API functions can be added here as needed
 * e.g., fetchProductById, createProduct, updateProduct, deleteProduct, etc.
 */

// You can export additional functions if you have more API endpoints to manage.
