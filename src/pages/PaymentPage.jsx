import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPaymentInfo } from '../services/apiService'; // Đã cập nhật tên hàm

const PaymentPage = () => {
  const { t, i18n } = useTranslation();
  const { ticket_id } = useParams(); // Lấy ticket_id từ URL
  const [paymentData, setPaymentData] = useState(null); // State chứa dữ liệu động từ API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isVietnamese = i18n.language === 'vi';

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      setPaymentData(null); // Reset data cũ
      try {
        // Gọi API để lấy thông tin thanh toán dựa trên ticket_id
        // Giả sử API trả về { qrCodeUrl: 'url_to_qr.png', amount: 2000000, currency: 'VND', transferContent: 'HIMA2025 REGID123' }
        console.log(`Fetching payment info for ticket_id: ${ticket_id}`);
        const data = await getPaymentInfo(ticket_id);
        console.log('Received payment data:', data);

        // Kiểm tra dữ liệu trả về (ít nhất phải có qrCodeUrl và amount)
        if (data && data.qrCodeUrl && data.amount !== undefined) {
          setPaymentData(data);
        } else {
          console.error('Invalid payment data received:', data);
          setError(t('paymentPage.errorFetchDetails', 'Không thể tải thông tin thanh toán hợp lệ.'));
        }
      } catch (err) {
        console.error('Failed to fetch payment details:', err);
        const errorMsg = err.response?.data?.message || err.message || t('paymentPage.errorFetchFailed', 'Lỗi kết nối hoặc máy chủ không phản hồi.');
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    // Chỉ gọi API nếu có ticket_id
    if (ticket_id) {
      fetchDetails();
    } else {
      setError(t('paymentPage.invalidId', 'ID đăng ký không hợp lệ trong URL.'));
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket_id]); // Chỉ chạy lại khi ticket_id thay đổi

  // Hàm copy vào clipboard
  const copyToClipboard = (text, type) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      // Có thể dùng thư viện toast để thông báo đẹp hơn
      alert(`${type || 'Text'} copied to clipboard!`);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy.');
    });
  };

  // ----- Thông tin tài khoản cố định -----
  const fixedAccountDetails = {
    accountName: t('paymentPage.accountName', 'Công ty TNHH tư vấn pháp lý y tế Việt Nam'),
    bankName: 'TPBank',
    bankLogo: 'https://tpb.vn/wps/wcm/connect/a85b875d-ad73-4591-8fd5-e8417a69c316/logo-tpb.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-a85b875d-ad73-4591-8fd5-e8417a69c316-pjudclH',
    accountNumber: '87968879879' // Số tài khoản cố định
  };
  // ------------------------------------

  // Hiển thị trạng thái Loading
  if (loading) {
    return <div className="text-center py-40 text-lg font-semibold">Đang tải thông tin thanh toán...</div>;
  }

  // Hiển thị lỗi
  // if (error) {
  //   return <div className="text-center py-40 text-red-600 text-lg font-semibold">{error}</div>;
  // }

  // Nếu không loading, không lỗi, nhưng không có data (trường hợp hiếm)
  // if (!paymentData) {
  //    return <div className="text-center py-40 text-orange-600 text-lg font-semibold">{t('paymentPage.noPaymentData', 'Không tìm thấy dữ liệu thanh toán.')}</div>;
  // }

  // Định dạng số tiền từ API
  const formattedAmount = new Intl.NumberFormat(isVietnamese ? 'vi-VN' : 'en-US', {
    style: 'currency',
    currency: paymentData?.currency || (isVietnamese ? 'VND' : 'USD'), // Ưu tiên currency từ API
    minimumFractionDigits: 0
  }).format(paymentData?.amount);

  // --- Render Giao Diện ---
  return (
    <main className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6 text-center">{t('paymentPage.title', 'Thanh toán')}</h1>
        <p className="mb-8 text-center text-gray-600">
          {t('paymentPage.instruction')}
        </p>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">

          {/* === Cột Bên Trái (QR Code và Nội dung CK - Động) === */}
          <div className="w-full md:w-1/2 flex flex-col p-4 md:p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-xl font-semibold text-brand-navy mb-4 text-center">{t('paymentPage.scanToPay', 'Quét mã để thanh toán')}</h3> {/* Thêm key */}
            <div className="mb-4 text-gray-600 text-sm text-center">
              <p>{t('paymentPage.step1')}</p>
              <p>{t('paymentPage.step2')} <i className="fa-solid fa-qrcode mx-1"></i> {t('paymentPage.step2Icon')}</p>
            </div>
            {/* Vùng hiển thị QR Code */}
            <div className="relative p-2 border-2 border-dashed border-gray-300 rounded-lg self-center mb-4">
              <img
                id="qr-image"
                src={paymentData?.qrCodeUrl} // Lấy URL QR từ state paymentData
                alt="Payment QR Code"
                className="w-56 h-56 md:w-64 md:h-64 object-contain" // Kích thước QR
                onError={(e) => e.target.src = '/assets/imgs/placeholder-qr.png'} // Ảnh thay thế nếu load lỗi
              />
            </div>
            {/* Nút tải QR */}
            <a
              id="download-qr-btn"
              href={paymentData?.qrCodeUrl}
              download={`HIMA2025_PaymentQR_${ticket_id}.png`}
              className="mt-4 mb-6 inline-flex items-center justify-center w-fit mx-auto bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 transition-all duration-300 shadow"
            >
              <i className="fa-solid fa-download mr-2"></i>
              <span>{t('paymentPage.downloadQR')}</span>
            </a>
            {/* Nội dung chuyển khoản (nếu có) */}
            {paymentData?.transferContent && (
                 <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-blue-800 text-sm">
                   <p className="font-semibold mb-1">{t('paymentPage.transferContentLabel', 'Nội dung chuyển khoản (bắt buộc):')}</p>
                   <div className="flex items-center justify-between gap-2">
                     <span id="transfer-content" className="font-mono text-base break-all">
                       {paymentData.transferContent}
                     </span>
                     <button
                        onClick={() => copyToClipboard(paymentData.transferContent, 'Transfer content')}
                        className="text-blue-500 hover:text-blue-700 transition text-lg flex-shrink-0 ml-2"
                        title="Copy"
                     >
                        <i className="fa-regular fa-copy"></i>
                     </button>
                   </div>
                 </div>
            )}
            <p className="mt-4 text-gray-600 text-sm text-center">{t('paymentPage.step3')}</p>
          </div>

          {/* === Cột Bên Phải (Thông tin Tài khoản - Cố định) === */}
          <div className="w-full md:w-1/2 flex flex-col p-4 md:p-6">
            <h3 className="text-xl font-semibold text-brand-navy mb-4">{t('paymentPage.transferDetails')}</h3>
            <p className="text-gray-500 text-sm mb-6">{t('paymentPage.supportText')}</p>
            {/* Tên tài khoản */}
            <div className="text-center bg-gray-100 py-3 px-4 rounded-lg mb-6 shadow-sm">
              <p className="text-lg md:text-xl font-bold text-brand-navy-light break-words">
                {fixedAccountDetails.accountName}
              </p>
            </div>
            {/* Thông tin chi tiết */}
            <div className="space-y-4 text-base">
              {/* Ngân hàng */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium w-2/5">{t('paymentPage.bank')}</span>
                <div className="flex items-center justify-end gap-2 w-3/5">
                  <span className="font-semibold">{fixedAccountDetails.bankName}</span>
                  <img src={fixedAccountDetails.bankLogo} className="h-5" alt={fixedAccountDetails.bankName} />
                </div>
              </div>
              {/* Số tài khoản */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium w-2/5">{t('paymentPage.accountNumber')}</span>
                <div className="flex items-center justify-end gap-2 w-3/5">
                  <span id="account-number" className="font-bold text-brand-teal text-lg">
                    {fixedAccountDetails.accountNumber}
                  </span>
                  <button onClick={() => copyToClipboard(fixedAccountDetails.accountNumber, 'Account number')} className="text-gray-400 hover:text-brand-teal transition text-lg" title="Copy">
                    <i className="fa-regular fa-copy"></i>
                  </button>
                </div>
              </div>
              {/* Số tiền (lấy từ API) */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium w-2/5">{t('paymentPage.amount')}</span>
                <div className="flex items-center justify-end gap-2 w-3/5">
                   <span id="amount" className="font-bold text-red-600 text-lg">{formattedAmount}</span>
                   <button onClick={() => copyToClipboard(paymentData.amount.toString(), 'Amount')} className="text-gray-400 hover:text-brand-teal transition text-lg" title="Copy">
                     <i className="fa-regular fa-copy"></i>
                   </button>
                </div>
              </div>
            </div>
            {/* Ghi chú cuối */}
            <div className="mt-auto pt-6 text-red-600 font-semibold text-center border-t border-dashed mt-8">
              <p>{t('paymentPage.finalNote')} <strong className="font-extrabold">{t('paymentPage.finalNoteBold')}</strong>{t('paymentPage.finalNoteEnd')}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentPage;