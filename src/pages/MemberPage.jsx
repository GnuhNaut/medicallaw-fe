import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Thêm Link
import { useTranslation } from 'react-i18next';
import { getMemberInfo } from '../services/apiService'; // Đã cập nhật
import MemberTicket from '../components/MemberTicket'; // Component hiển thị vé

const MemberPage = () => {
  const { t } = useTranslation();
  const { ticket_id } = useParams(); // Lấy ticket_id từ URL
  const [memberRegistration, setMemberRegistration] = useState(null); // State chứa dữ liệu registration
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // State cho thông báo từ backend khi success: false

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      setError('');
      setMessage('');
      setMemberRegistration(null); // Reset data
      try {
        console.log(`Fetching member info for ticket_id: ${ticket_id}`);
        const response = await getMemberInfo(ticket_id);
        console.log('Received member info:', response);

        // Xử lý response từ backend
        if (response.success === true && response.data && response.data.registration) {
          // Thành công: lưu dữ liệu registration vào state
          setMemberRegistration(response.data.registration);
        } else if (response.success === false) {
          // Thất bại logic (vd: không tìm thấy, chưa thanh toán): hiển thị message
          setMessage(response.message || t('memberPage.genericBackendError', 'Thông tin không hợp lệ hoặc chưa hoàn tất đăng ký.'));
        } else {
          // Cấu trúc response không đúng
          console.error('Unexpected member info response structure:', response);
          setError(t('memberPage.errorFetchDetails', 'Không thể tải thông tin thành viên. Dữ liệu trả về không đúng định dạng.'));
        }
      } catch (err) {
        // Lỗi mạng hoặc server 500
        console.error('Failed to fetch member details:', err);
        setError(t('memberPage.errorFetchFailed', 'Lỗi kết nối máy chủ. Vui lòng thử lại sau.'));
      } finally {
        setLoading(false);
      }
    };

    if (ticket_id) {
      fetchMember();
    } else {
      setError(t('memberPage.invalidId', 'ID thành viên không hợp lệ.'));
      setLoading(false);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket_id]); // Chỉ fetch lại khi ticket_id thay đổi

  // Render trạng thái Loading
  if (loading) {
    return (
      <main className="container mx-auto px-4 py-24 text-center">
        <div className="loader border-4 border-gray-200 border-t-brand-navy rounded-full w-12 h-12 animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-semibold">Đang tải thông tin thành viên...</p>
      </main>
    );
  }

  // Render lỗi kết nối/server
  if (error) {
    return (
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
          <strong className="font-bold">Đã xảy ra lỗi!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      </main>
    );
  }

  // Render thông báo từ backend (success: false)
  if (message) {
    return (
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg text-center border-t-4 border-yellow-400">
          <i className="fas fa-exclamation-triangle text-5xl text-yellow-500 mb-5"></i>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t('memberPage.notificationTitle', 'Thông báo')}</h2> {/* Key mới */}
          <p className="text-lg text-gray-600 mb-6">{message}</p>
          <Link
            to="/"
            className="inline-block bg-brand-navy text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition duration-300"
          >
            {t('memberPage.backHome', 'Quay về trang chủ')} {/* Key mới */}
          </Link>
        </div>
      </main>
    );
  }

  // Render vé thành viên khi có dữ liệu (success: true)
  if (memberRegistration) {
    return (
      <main className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
         <h1 className="text-3xl md:text-4xl font-bold text-center text-brand-navy mb-8">{t('memberPage.ticketTitle', 'Vé Tham Dự Hội Nghị')}</h1> {/* Key mới */}
        <MemberTicket memberInfo={memberRegistration} />
        {/* Có thể thêm nút In vé hoặc Lưu vé ở đây */}
      </main>
    );
  }

  // Fallback nếu không có trạng thái nào khớp (ít xảy ra)
  return (
    <main className="container mx-auto px-4 py-24 text-center">
        <p className="text-lg text-gray-500">{t('memberPage.noData', 'Không có thông tin để hiển thị.')}</p>
    </main>
  );
};

export default MemberPage;