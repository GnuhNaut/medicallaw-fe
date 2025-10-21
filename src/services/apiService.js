import axios from 'axios';
import { API_BASE_URL } from '../config'; // Đảm bảo bạn đã cấu hình URL API đúng

// Tạo một instance axios với cấu hình cơ bản
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json', // Thêm Accept header
  },
});

/**
 * Gửi dữ liệu đăng ký đến API endpoint.
 * @param {object} formData - Dữ liệu từ form đăng ký (đã bao gồm guest_type).
 * @returns {Promise<any>} - Promise chứa dữ liệu trả về từ server (mong đợi { success: true, ticket_id: '...' }).
 */
export const sendRegistrationData = async (formData) => {
  try {
    console.log('Sending registration data:', formData); // Log dữ liệu gửi đi
    const response = await apiClient.post('/submit-form', formData);
    console.log('Registration response:', response.data); // Log dữ liệu trả về
    return response.data;
  } catch (error) {
    // Log lỗi chi tiết hơn
    console.error('API Error [sendRegistrationData]:', error.response?.data || error.message || error);
    // Ném lỗi để component có thể bắt và hiển thị thông báo phù hợp
    throw error;
  }
};

/**
 * Lấy thông tin thanh toán dựa trên ticket_id.
 * @param {string} ticket_id - ID vé/đăng ký.
 * @returns {Promise<any>} - Promise chứa dữ liệu thanh toán (vd: { qrCodeUrl: '...', amount: ..., currency: '...', transferContent: '...' }).
 */
export const getPaymentInfo = async (ticket_id) => {
  if (!ticket_id) {
    console.error('API Error [getPaymentInfo]: ticket_id is missing');
    throw new Error('Ticket ID is required for fetching payment info.');
  }
  try {
    console.log(`Fetching payment info for ticket_id: ${ticket_id}`);
    const response = await apiClient.get(`/payment-info/${ticket_id}`);
    console.log('Payment info response:', response.data);
    // Giả sử backend trả về dữ liệu cần thiết trực tiếp trong response.data
    // Nếu có cấu trúc phức tạp hơn, bạn cần điều chỉnh ở đây
    return response.data;
  } catch (error) {
    console.error(`API Error [getPaymentInfo for ${ticket_id}]:`, error.response?.data || error.message || error);
    throw error;
  }
};

/**
 * Lấy thông tin chi tiết thành viên dựa trên ticket_id.
 * @param {string} ticket_id - ID vé/đăng ký.
 * @returns {Promise<any>} - Promise chứa thông tin thành viên ({ success: true, data: { registration: {...} } }) hoặc thông báo lỗi ({ success: false, message: '...' }).
 */
export const getMemberInfo = async (ticket_id) => {
  if (!ticket_id) {
    console.error('API Error [getMemberInfo]: ticket_id is missing');
    throw new Error('Ticket ID is required for fetching member info.');
  }
  try {
    console.log(`Fetching member info for ticket_id: ${ticket_id}`);
    const response = await apiClient.get(`/member-info/${ticket_id}`);
    console.log('Member info response:', response.data);
    return response.data; // Trả về toàn bộ response data
  } catch (error) {
    console.error(`API Error [getMemberInfo for ${ticket_id}]:`, error.response?.data || error.message || error);
    // Nếu backend trả về 404 với JSON lỗi, axios sẽ ném lỗi và response data nằm trong error.response.data
    if (error.response && error.response.status === 404 && error.response.data) {
      // Trả về cấu trúc lỗi mà component MemberPage mong đợi
      return error.response.data; // { success: false, message: '...' }
    }
    // Ném các lỗi khác (500, network error...) để component xử lý
    throw error;
  }
};

export const checkPaymentStatus = async (ticket_id) => {
  if (!ticket_id) {
    console.error('API Error [checkPaymentStatus]: ticket_id is missing');
    throw new Error('Ticket ID is required for checking status.');
  }
  try {
    // console.log(`Checking payment status for ticket_id: ${ticket_id}`); // Bỏ log này để tránh spam console
    const response = await apiClient.get(`/check-payment-status/${ticket_id}`);
    // console.log('Payment status response:', response.data); // Bỏ log này
    return response.data;
  } catch (error) {
    console.error(`API Error [checkPaymentStatus for ${ticket_id}]:`, error.response?.data || error.message || error);
    // Nếu là lỗi 404 (không tìm thấy), trả về cấu trúc lỗi success: false
    if (error.response && error.response.status === 404 && error.response.data) {
      return error.response.data;
    }
    // Ném lỗi khác
    throw error;
  }
};