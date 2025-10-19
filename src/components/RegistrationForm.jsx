import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { sendRegistrationData } from '../services/apiService';

const RegistrationForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    members: '', // Đã có sẵn
    email: '',
    phone: '',
    address: '',   // Đã có sẵn
    question: '',  // Đã có sẵn
    guestType: '', // Sử dụng state này
    field: '',     // Đã có sẵn
  });
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const handleChange = (e) => {
    // Cập nhật state formData dựa trên name của input/select
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: '' });
    try {
      // Chuẩn bị dữ liệu gửi đi, đổi key `guestType` thành `guest_type`
      const dataToSend = {
        ...formData,
        guest_type: formData.guestType, // Đổi key ở đây
      };
      // Xóa key guestType cũ không cần thiết nữa
      delete dataToSend.guestType;

      // Gọi API với dữ liệu đã chuẩn bị
      const res = await sendRegistrationData(dataToSend);

      // Kiểm tra response từ backend
      if (res.success && res.ticket_id) {
        setStatus({ loading: false, message: t('registerForm.success', 'Đăng ký thành công! Đang chuyển hướng...'), type: 'success' });
        // Chuyển hướng đến trang thanh toán với ticket_id
        setTimeout(() => navigate(`/payment/${res.ticket_id}`), 1500);
      } else {
        // Hiển thị lỗi từ backend nếu có, hoặc lỗi chung
        setStatus({ loading: false, message: res.message || t('registerForm.error', 'Đăng ký thất bại. Vui lòng thử lại.'), type: 'error' });
      }
    } catch (err) {
      // Hiển thị lỗi kết nối hoặc lỗi server
      const errorMessage = err.response?.data?.message || t('registerForm.serverError', 'Không thể kết nối máy chủ. Vui lòng thử lại sau.');
      setStatus({ loading: false, message: errorMessage, type: 'error' });
    }
  };

  return (
    <section id="dang-ky" className="bg-cover bg-center shadow-md shadow-brand-gold rounded-3xl shadow-2xl p-6 md:p-10 w-11/12 md:w-3/4 lg:w-1/2 mx-auto -mt-32 relative z-20" style={{ backgroundImage: "url('/assets/imgs/BG.jpg')" }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-gold mb-4 tracking-tight">{t('registerForm.title')}</h2>
        <p className="text-lg text-white mb-12">{t('registerForm.note')}</p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto space-y-6 rounded">
        {/* Input Họ và Tên */}
        <input type="text" name="name" placeholder={t('registerForm.fullName')} value={formData.name} onChange={handleChange} required className="peer w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition" />

        {/* Grid cho Chức vụ và Số lượng */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <input type="text" name="position" placeholder={t('registerForm.position')} value={formData.position} onChange={handleChange} required className="peer w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition" />
          <input type="number" name="members" placeholder={t('registerForm.members')} value={formData.members} onChange={handleChange} required min="1" className="peer w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition" />
        </div>

        {/* Grid cho Email và Điện thoại */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="email" name="email" placeholder={t('registerForm.email')} value={formData.email} onChange={handleChange} required className="peer w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition" />
          <input type="tel" name="phone" placeholder={t('registerForm.phone')} value={formData.phone} onChange={handleChange} required className="peer w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition" />
        </div>

        {/* Input Địa chỉ */}
        <input type="text" name="address" placeholder={t('registerForm.address')} value={formData.address} onChange={handleChange} required className="peer w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition" />

        {/* Input Câu hỏi */}
        <input type="text" name="question" placeholder={t('registerForm.question')} value={formData.question} onChange={handleChange} className="peer w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition" />

        {/* Grid cho Selects Lĩnh vực và Loại đăng ký */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Select Lĩnh vực */}
          <select name="field" value={formData.field} onChange={handleChange} required className="peer custom-select w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold transition appearance-none">
              <option value="" disabled>{t('registerForm.field')}</option>
              <option value="BenhVien">{t('registerForm.fieldOptions.hos')}</option>
              <option value="DuocPham">{t('registerForm.fieldOptions.duoc')}</option>
              <option value="CongNgheYSinh">{t('registerForm.fieldOptions.VNYS')}</option>
              <option value="NhaMayCongNghe">{t('registerForm.fieldOptions.NMCN')}</option>
              <option value="PhanPhoiMyPhamDinhDuong">{t('registerForm.fieldOptions.MPDD')}</option>
              <option value="ChamSocSucKhoe">{t('registerForm.fieldOptions.care')}</option>
              <option value="DauTu">{t('registerForm.fieldOptions.invest')}</option>
              <option value="Khac">{t('registerForm.fieldOptions.other')}</option>
          </select>
          {/* Select Loại đăng ký - Đảm bảo name="guestType" */}
          <select name="guestType" value={formData.guestType} onChange={handleChange} required className="peer custom-select w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold transition appearance-none">
              <option value="" disabled>{t('registerForm.guestType')}</option>
              <option value="networking">{t('registerForm.guestOptions.networking')}</option>
              <option value="Taitro">{t('registerForm.guestOptions.sponsorship')}</option>
              <option value="Thamdu">{t('registerForm.guestOptions.attend')}</option>
          </select>
        </div>

        {/* Hiển thị thông báo trạng thái */}
        {status.message && (
          <div className={`text-center p-3 rounded-md ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status.message}
          </div>
        )}

        {/* Nút Submit */}
        <button type="submit" disabled={status.loading} className="shimmer-btn w-full bg-gradient-to-r from-brand-gold to-yellow-500 text-white font-bold py-4 rounded-lg hover:from-brand-gold-dark hover:to-brand-gold transition shadow-lg text-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {status.loading ? (
            <span className="loader border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></span>
          ) : (
            t('registerForm.submit')
          )}
        </button>
      </form>
    </section>
  );
};

export default RegistrationForm;