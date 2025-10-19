import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { sendRegistrationData } from '../services/apiService';
const RegistrationForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', position: '', members: '', email: '', phone: '', address: '', question: '',
    guestType: '', field: '',
  });
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: '' });
    try {
      const res = await sendRegistrationData(formData);
        // console.log(res);
      if (res.success) {
        setStatus({ loading: false, message: t('registerForm.success'), type: 'success' });
        setTimeout(() => navigate('/payment'), 2000);
      } else {
        setStatus({ loading: false, message: t('registerForm.error'), type: 'error' });
      }
    } catch (err) {
      setStatus({ loading: false, message: t('registerForm.serverError'), type: 'error' });
    }
  };

  return (
    <section id="dang-ky" className="bg-cover bg-center shadow-md shadow-brand-gold rounded-3xl shadow-2xl p-6 md:p-10 w-11/12 md:w-3/4 lg:w-1/2 mx-auto -mt-32 relative z-20" style={{ backgroundImage: "url('/assets/imgs/BG.jpg')" }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-gold mb-4 tracking-tight">{t('registerForm.title')}</h2>
        <p className="text-lg text-white mb-12">{t('registerForm.note')}</p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto space-y-6 rounded">
        {/* Form Inputs */}
        <input type="text" name="name" placeholder={t('registerForm.fullName')} onChange={handleChange} required className="peer w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition" />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <input type="text" name="position" placeholder={t('registerForm.position')} onChange={handleChange} required className="peer w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition" />
            <input type="number" name="members" placeholder={t('registerForm.members')} onChange={handleChange} required className="peer w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="email" name="email" placeholder={t('registerForm.email')} onChange={handleChange} required className="peer w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition" />
          <input type="tel" name="phone" placeholder={t('registerForm.phone')} onChange={handleChange} required className="peer w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition" />
        </div>
        <input type="text" name="address" placeholder={t('registerForm.address')} onChange={handleChange} required className="peer w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition" />
        <input type="text" name="question" placeholder={t('registerForm.question')} onChange={handleChange} className="peer w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition" />

        {/* Selects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select name="field" onChange={handleChange} required className="peer custom-select w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition">
                <option value="">{t('registerForm.field')}</option>
                <option value="BenhVien">{t('registerForm.fieldOptions.hos')}</option>
                <option value="DuocPham">{t('registerForm.fieldOptions.duoc')}</option>
                <option value="CongNgheYSinh">{t('registerForm.fieldOptions.VNYS')}</option>
                <option value="NhaMayCongNghe">{t('registerForm.fieldOptions.NMCN')}</option>
                <option value="PhanPhoiMyPhamDinhDuong">{t('registerForm.fieldOptions.MPDD')}</option>
                <option value="ChamSocSucKhoe">{t('registerForm.fieldOptions.care')}</option>
                <option value="DauTu">{t('registerForm.fieldOptions.invest')}</option>
                <option value="Khac">{t('registerForm.fieldOptions.other')}</option>
            </select>
            <select name="guestType" onChange={handleChange} required className="peer custom-select w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-gold transition">
                <option value="">{t('registerForm.guestType')}</option>
                <option value="networking">{t('registerForm.guestOptions.networking')}</option>
                <option value="Taitro">{t('registerForm.guestOptions.sponsorship')}</option>
                <option value="Thamdu">{t('registerForm.guestOptions.attend')}</option>
            </select>
        </div>
        {/* Add other selects similarly */}

        {status.message && (
          <div className={`text-center p-3 rounded-md ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status.message}
          </div>
        )}

        <button type="submit" disabled={status.loading} className="shimmer-btn w-full bg-gradient-to-r from-brand-gold to-yellow-500 text-white font-bold py-4 rounded-lg hover:from-brand-gold-dark hover:to-brand-gold transition shadow-lg text-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
          {status.loading ? <span className="loader border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></span> : t('registerForm.submit')}
        </button>
      </form>
    </section>
  );
};

export default RegistrationForm;