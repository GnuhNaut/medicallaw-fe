import axios from 'axios';
import { API_BASE_URL } from '../config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Gửi dữ liệu đăng ký đến API endpoint.
 * @param {object} formData - Dữ liệu từ form đăng ký.
 * @returns {Promise<any>} - Promise chứa dữ liệu trả về từ server.
 */
export const sendRegistrationData = async (formData) => {
  try {
    // axios tự động ném lỗi cho các status code ngoài 2xx
    const response = await apiClient.post('/submit-form', formData);
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error('API Error:', error.response || error.message);
    // Ném lỗi để component có thể bắt và xử lý
    throw error;
  }
};