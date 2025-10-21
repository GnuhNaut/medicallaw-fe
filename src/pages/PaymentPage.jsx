import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { QRCodeCanvas } from 'qrcode.react';
import { getPaymentInfo, checkPaymentStatus } from '../services/apiService';
import { PRICE_VND, PRICE_USD } from '../config'; // Đảm bảo config.js có export PRICE_VND, PRICE_USD

// --- Component hiển thị khi thanh toán thành công ---
const PaymentSuccessDisplay = ({ ticketId, t }) => (
  <div className="text-center py-16 px-6 bg-green-50 rounded-lg border border-green-300 shadow-md">
    <i className="fas fa-check-circle text-6xl text-green-500 mb-5 animate-pulse"></i>
    <h2 className="text-3xl font-bold text-green-800 mb-3">
      {t('paymentPage.successTitle', 'Thanh toán thành công!')}
    </h2>
    <p className="text-lg text-gray-700 mb-6">
      {t('paymentPage.successMessage', 'Cảm ơn bạn đã hoàn tất thanh toán. Vé điện tử đã được gửi đến email của bạn.')}
    </p>
    <Link
      to={`/member/${ticketId}`} // Link đến trang xem vé
      className="inline-block bg-brand-navy text-white font-semibold py-3 px-8 rounded-lg hover:bg-opacity-90 transition duration-300 shadow"
    >
      {t('paymentPage.viewTicket', 'Xem vé của bạn')}
    </Link>
  </div>
);

// --- Component hiển thị khi polling timeout ---
const PollingTimeoutDisplay = ({ t }) => (
    <div className="text-center py-16 px-6 bg-yellow-50 rounded-lg border border-yellow-300 shadow-md">
        <i className="fas fa-clock text-6xl text-yellow-500 mb-5"></i>
        <h2 className="text-3xl font-bold text-yellow-800 mb-3">
            {t('paymentPage.timeoutTitle', 'Chưa nhận được xác nhận')}
        </h2>
        <p className="text-lg text-gray-700">
            {t('paymentPage.timeoutMessage', 'Đã hết thời gian chờ xác nhận thanh toán tự động. Vui lòng tải lại trang hoặc kiểm tra email sau ít phút.')}
        </p>
         <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-block bg-brand-navy text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 shadow"
          >
            {t('paymentPage.reloadButton', 'Tải lại trang')}
         </button>
    </div>
);


// --- Component Trang Thanh Toán Chính ---
const PaymentPage = () => {
  const { t, i18n } = useTranslation();
  const { ticket_id } = useParams();
  const [paymentData, setPaymentData] = useState(null); // Lưu trữ data trả về từ getPaymentInfo (bao gồm registration và qr_code_data)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending', 'paid'
  const [pollingTimeoutOccurred, setPollingTimeoutOccurred] = useState(false); // State cho timeout

  // Refs để quản lý intervals và timeouts
  const pollingIntervalRef = useRef(null);
  const pollingTimeoutRef = useRef(null);
  const pollingStartTimeRef = useRef(null);

  const isVietnamese = i18n.language === 'vi';

  // --- Hàm dừng Polling ---
  const stopPolling = (reason = 'unknown') => {
    console.log(`Stopping polling. Reason: ${reason}`);
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }
    pollingStartTimeRef.current = null; // Reset thời gian bắt đầu
  };

  // --- Logic Polling ---
  const startPolling = () => {
    stopPolling('starting new polling cycle');
    pollingStartTimeRef.current = Date.now();
    setPollingTimeoutOccurred(false);

    const POLLING_TIMEOUT_DURATION = 10 * 60 * 1000; // 10 phút
    const PHASE1_DURATION = 5 * 60 * 1000; // 5 phút đầu
    const INTERVAL_PHASE1 = 5 * 1000; // 5 giây
    const INTERVAL_PHASE2 = 20 * 1000; // 20 giây

    const checkStatus = async () => {
      if (!ticket_id || pollingTimeoutOccurred || paymentStatus === 'paid') return;

      try {
        const statusResponse = await checkPaymentStatus(ticket_id);
        if (statusResponse.success && statusResponse.payment_status === 'paid') {
          console.log('Payment confirmed via polling!');
          setPaymentStatus('paid');
          stopPolling('payment confirmed');
        } else if (!statusResponse.success) {
          console.error('Error polling status:', statusResponse.message);
          // Có thể dừng nếu lỗi nghiêm trọng (vd: 404)
          // stopPolling('API error');
        }
      } catch (pollError) {
        console.error('Network error during polling request:', pollError);
        // Có thể dừng nếu lỗi mạng liên tục
        // stopPolling('network error');
      }
    };

    const manageInterval = () => {
      const elapsedTime = Date.now() - pollingStartTimeRef.current;

      if (elapsedTime >= POLLING_TIMEOUT_DURATION) {
        console.log("Polling timed out.");
        setPollingTimeoutOccurred(true);
        stopPolling('timeout');
        return;
      }

      const currentInterval = elapsedTime < PHASE1_DURATION ? INTERVAL_PHASE1 : INTERVAL_PHASE2;

      // Gọi kiểm tra ngay lập tức
      checkStatus();

      // Xóa interval cũ, tạo mới
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - pollingStartTimeRef.current;
        if (elapsed >= POLLING_TIMEOUT_DURATION) {
          setPollingTimeoutOccurred(true);
          stopPolling('timeout');
          return;
        }
        const intervalForThisCheck = elapsed < PHASE1_DURATION ? INTERVAL_PHASE1 : INTERVAL_PHASE2;
        if (intervalForThisCheck !== currentInterval) {
          manageInterval(); // Reset interval nếu cần thay đổi
        } else {
          checkStatus(); // Tiếp tục kiểm tra
        }
      }, currentInterval);

      console.log(`Polling started with interval: ${currentInterval / 1000}s`);
    };

    manageInterval(); // Bắt đầu

    // Backup timeout
    pollingTimeoutRef.current = setTimeout(() => {
      if (paymentStatus !== 'paid' && !pollingTimeoutOccurred) {
        setPollingTimeoutOccurred(true);
        stopPolling('main timeout triggered');
      }
    }, POLLING_TIMEOUT_DURATION);
  };

  useEffect(() => {
    // --- Fetch thông tin thanh toán ban đầu ---
    const fetchInitialDetails = async () => {
      setLoading(true);
      setError('');
      setPaymentData(null);
      setPaymentStatus('pending');
      stopPolling('fetching new data');

      try {
        const response = await getPaymentInfo(ticket_id);
        if (response.success && response.data) {
           setPaymentData(response.data); // Lưu toàn bộ data vào state
           // Giả sử payment_status nằm trong response.data.registration
           const initialStatus = response.data.registration?.payment_status || 'pending';
           console.log("Initial Payment Status:", initialStatus);
           if (initialStatus === 'paid') {
               setPaymentStatus('paid');
           } else {
               startPolling(); // Chỉ bắt đầu polling nếu chưa paid
           }
        } else {
          setError(response.message || t('paymentPage.errorFetchDetails', 'Không thể tải thông tin thanh toán hợp lệ.'));
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || t('paymentPage.errorFetchFailed', 'Lỗi kết nối hoặc máy chủ không phản hồi.');
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    if (ticket_id) { fetchInitialDetails(); }
    else { setError(t('paymentPage.invalidId', 'ID đăng ký không hợp lệ trong URL.')); setLoading(false); }

    // Cleanup
    return () => { stopPolling('component unmount'); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket_id]);

  // Hàm copy
  const copyToClipboard = (text, type) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      alert(`${type || 'Text'} copied to clipboard!`);
    }).catch(err => { console.error('Failed to copy text: ', err); alert('Failed to copy.'); });
  };

  // Hàm tải QR
  const handleDownloadQR = () => {
    const canvas = document.getElementById('payment-qrcode-canvas');
    if (canvas) {
      try {
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `HIMA2025_PaymentQR_${ticket_id}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } catch (e) { console.error("Could not download QR Code", e); alert(t('paymentPage.errorDownloadQR', 'Không thể tải mã QR.')); }
    } else { console.error("QR Code Canvas not found"); alert(t('paymentPage.errorDownloadQR', 'Không thể tải mã QR.')); }
  };

  // ----- Thông tin tài khoản cố định -----
  const fixedAccountDetails = {
    accountName: t('paymentPage.accountName', 'Công ty TNHH tư vấn pháp lý y tế Việt Nam'),
    bankName: 'TPBank',
    bankLogo: 'https://tpb.vn/wps/wcm/connect/a85b875d-ad73-4591-8fd5-e8417a69c316/logo-tpb.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-a85b875d-ad73-4591-8fd5-e8417a69c316-pjudclH',
    accountNumber: '87968879879'
  };
  // ------------------------------------

  // === Render ===

  if (loading) {
    return <div className="text-center py-40 text-lg font-semibold">Đang tải thông tin thanh toán...</div>;
  }

  if (error) {
    return <div className="text-center py-40 text-red-600 text-lg font-semibold">{error}</div>;
  }

  // Hiển thị khi Polling Timeout
  if (pollingTimeoutOccurred) {
      return (
          <main className="container mx-auto px-4 py-16 md:py-24">
             <div className="max-w-2xl mx-auto"> <PollingTimeoutDisplay t={t} /> </div>
          </main>
      );
  }

  // Hiển thị khi Thanh toán Thành công
  if (paymentStatus === 'paid') {
     return (
        <main className="container mx-auto px-4 py-16 md:py-24">
           <div className="max-w-2xl mx-auto"> <PaymentSuccessDisplay ticketId={ticket_id} t={t} /> </div>
        </main>
     );
  }

  // Hiển thị giao diện thanh toán (khi đang pending)
  if (paymentData) {
    // Lấy số lượng members từ paymentData.registration
    const numberOfMembers = paymentData.registration?.members || 1;
    const amountToPay = (isVietnamese ? PRICE_VND : PRICE_USD) * numberOfMembers;
    const formattedAmount = new Intl.NumberFormat(isVietnamese ? 'vi-VN' : 'en-US', {
      style: 'currency', currency: isVietnamese ? 'VND' : 'USD', minimumFractionDigits: 0
    }).format(isVietnamese ? PRICE_VND*paymentData.members : PRICE_USD*paymentData.members);
    // Lấy qr code data string
    const qrCodeDataString = paymentData.qr_code_data?.qrCode;
    // Lấy nội dung chuyển khoản
    const transferContent = paymentData.transferContent; // Giả sử API trả về trường này

    return (
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6 text-center">{t('paymentPage.title', 'Thanh toán')}</h1>
          <p className="mb-8 text-center text-gray-600">
            {t('paymentPage.instructionPolling', 'Vui lòng thanh toán theo thông tin dưới đây. Trang sẽ tự động kiểm tra và cập nhật trạng thái.')}
          </p>

          {/* Icon loading nhỏ khi đang polling */}
          {!pollingTimeoutOccurred && paymentStatus === 'pending' && (
              <div className="flex justify-center items-center mb-4 text-sm text-gray-500">
                  <span className="loader border-2 border-gray-300 border-t-brand-navy rounded-full w-4 h-4 animate-spin mr-2"></span>
                  {t('paymentPage.pollingStatus', 'Đang kiểm tra trạng thái thanh toán...')}
              </div>
          )}

          <div className="flex flex-col md:flex-row gap-8 md:gap-12">

            {/* === Cột Bên Trái (QR Code) === */}
            <div className="w-full md:w-1/2 flex flex-col p-4 md:p-6 border border-gray-200 rounded-xl bg-gray-50 items-center">
              <h3 className="text-xl font-semibold text-brand-navy mb-4 text-center">{t('paymentPage.scanToPay', 'Quét mã để thanh toán')}</h3>
              <div className="mb-4 text-gray-600 text-sm text-center">
                <p>{t('paymentPage.step1')}</p>
                <p>{t('paymentPage.step2')} <i className="fa-solid fa-qrcode mx-1"></i> {t('paymentPage.step2Icon')}</p>
              </div>
              <div className="relative p-2 border-2 border-dashed border-gray-300 rounded-lg self-center mb-4 bg-white">
                {qrCodeDataString ? (
                  <QRCodeCanvas id="payment-qrcode-canvas" value={qrCodeDataString} size={240} bgColor={"#ffffff"} fgColor={"#000000"} level={"L"} includeMargin={true} />
                ) : (
                  <div className="w-[240px] h-[240px] flex items-center justify-center text-gray-400">{t('paymentPage.qrLoadingError', 'Lỗi tải mã QR')}</div>
                )}
              </div>
              {qrCodeDataString && (
                 <button onClick={handleDownloadQR} className="mt-4 mb-6 inline-flex items-center justify-center w-fit mx-auto bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 transition-all duration-300 shadow">
                   <i className="fa-solid fa-download mr-2"></i> <span>{t('paymentPage.downloadQR', 'Tải xuống QR')}</span>
                 </button>
               )}
              {transferContent && (
                   <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-blue-800 text-sm w-full">
                     <p className="font-semibold mb-1">{t('paymentPage.transferContentLabel', 'Nội dung chuyển khoản (bắt buộc):')}</p>
                     <div className="flex items-center justify-between gap-2">
                       <span id="transfer-content" className="font-mono text-base break-all">{transferContent}</span>
                       <button onClick={() => copyToClipboard(transferContent, 'Transfer content')} className="text-blue-500 hover:text-blue-700 transition text-lg flex-shrink-0 ml-2" title="Copy"><i className="fa-regular fa-copy"></i></button>
                     </div>
                   </div>
              )}
              <p className="mt-4 text-gray-600 text-sm text-center">{t('paymentPage.step3')}</p>
            </div>

            {/* === Cột Bên Phải (Thông tin Tài khoản) === */}
            <div className="w-full md:w-1/2 flex flex-col p-4 md:p-6">
              <h3 className="text-xl font-semibold text-brand-navy mb-4">{t('paymentPage.transferDetails')}</h3>
              <p className="text-gray-500 text-sm mb-6">{t('paymentPage.supportText')}</p>
              <div className="text-center bg-gray-100 py-3 px-4 rounded-lg mb-6 shadow-sm">
                <p className="text-lg md:text-xl font-bold text-brand-navy-light break-words">{fixedAccountDetails.accountName}</p>
              </div>
              <div className="space-y-4 text-base">
                <div className="flex items-center justify-between">
                   <span className="text-gray-600 font-medium w-2/5">{t('paymentPage.bank')}</span>
                   <div className="flex items-center justify-end gap-2 w-3/5"> <span className="font-semibold">{fixedAccountDetails.bankName}</span> <img src={fixedAccountDetails.bankLogo} className="h-5" alt={fixedAccountDetails.bankName} /> </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium w-2/5">{t('paymentPage.accountNumber')}</span>
                  <div className="flex items-center justify-end gap-2 w-3/5"> <span id="account-number" className="font-bold text-brand-teal text-lg">{fixedAccountDetails.accountNumber}</span> <button onClick={() => copyToClipboard(fixedAccountDetails.accountNumber, 'Account number')} className="text-gray-400 hover:text-brand-teal transition text-lg" title="Copy"><i className="fa-regular fa-copy"></i></button> </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium w-2/5">{t('paymentPage.amount')}</span>
                  <div className="flex items-center justify-end gap-2 w-3/5"> <span id="amount" className="font-bold text-red-600 text-lg">{formattedAmount}</span> <button onClick={() => copyToClipboard(amountToPay.toString(), 'Amount')} className="text-gray-400 hover:text-brand-teal transition text-lg" title="Copy"><i className="fa-regular fa-copy"></i></button> </div>
                </div>
              </div>
              <div className="mt-auto pt-6 text-red-600 font-semibold text-center border-t border-dashed mt-8">
                <p>{t('paymentPage.finalNote')} <strong className="font-extrabold">{t('paymentPage.finalNoteBold')}</strong>{t('paymentPage.finalNoteEnd')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Fallback cuối cùng
  return <div className="text-center py-40 text-gray-500">Đang tải dữ liệu...</div>;
};

export default PaymentPage;