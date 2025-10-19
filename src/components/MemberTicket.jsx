import React from 'react';
import { useTranslation } from 'react-i18next';

// Helper để lấy bản dịch cho các giá trị select
const getTranslatedValue = (value, t, optionsNamespace) => {
  if (!value) return ''; // Trả về chuỗi rỗng nếu không có giá trị
  const translationKey = `${optionsNamespace}.${value}`;
  const translated = t(translationKey);
  // Nếu không tìm thấy bản dịch, trả về giá trị gốc
  return translated === translationKey ? value : translated;
};

// Helper để lấy bản dịch và màu sắc cho Ticket Status
const getTicketStatusDisplay = (status, t) => {
  // Key dịch thuật dựa trên giá trị status (vd: memberTicket.ticketStatusValues.not_used)
  const statusKey = `memberTicket.ticketStatusValues.${status?.toLowerCase()}`;
  const translatedStatus = t(statusKey, status || 'N/A'); // Fallback nếu không có bản dịch

  let bgColor = 'bg-gray-500'; // Màu mặc định
  let textColor = 'text-white';
  let icon = 'fa-solid fa-question-circle'; // Icon mặc định

  switch (status?.toLowerCase()) {
    case 'not_used':
      bgColor = 'bg-green-600'; // Màu xanh cho vé chưa sử dụng
      textColor = 'text-white';
      icon = 'fa-solid fa-check-circle'; // Icon tick xanh
      break;
    case 'used':
      bgColor = 'bg-orange-600'; // Màu cam/đỏ cho vé đã sử dụng
      textColor = 'text-white';
      icon = 'fa-solid fa-times-circle'; // Icon x đỏ
      break;
    default:
      // Giữ màu mặc định nếu status không xác định
      break;
  }

  return { text: translatedStatus, bgColor, textColor, icon };
};


const MemberTicket = ({ memberInfo }) => {
  const { t } = useTranslation();

  // ----- Mapping từ key backend (trong memberInfo) sang label hiển thị -----
  const fieldLabels = {
    name: t('memberTicket.label.name', 'Họ và Tên'),
    position: t('memberTicket.label.position', 'Chức vụ / Đơn vị'),
    members: t('memberTicket.label.members', 'Số lượng'),
    email: t('memberTicket.label.email', 'Email'),
    phone: t('memberTicket.label.phone', 'Điện thoại'),
    address: t('memberTicket.label.address', 'Địa chỉ'),
    field: t('memberTicket.label.field', 'Lĩnh vực'),
    guest_type: t('memberTicket.label.guestType', 'Loại đăng ký'), // Key backend là guest_type
    question: t('memberTicket.label.question', 'Câu hỏi'),
    ticket_id: t('memberTicket.label.ticketId', 'Mã vé'),
    created_at: t('memberTicket.label.registeredAt', 'Ngày đăng ký'),
    // Không cần label riêng cho ticket_status vì sẽ hiển thị cùng ticket_id
  };
  // -----------------------------------------------------------------------

  // Lấy giá trị đã dịch
  const translatedField = getTranslatedValue(memberInfo.field, t, 'registerForm.fieldOptions');
  const translatedGuestType = getTranslatedValue(memberInfo.guest_type, t, 'registerForm.guestOptions');
  const ticketStatusDisplay = getTicketStatusDisplay(memberInfo.ticket_status, t); // Lấy hiển thị cho ticket_status

  // Định dạng ngày
  const formattedCreatedAt = memberInfo.created_at
    ? new Date(memberInfo.created_at).toLocaleDateString(t('localeCode', 'vi-VN'), {
        day: '2-digit', month: '2-digit', year: 'numeric',
      })
    : 'N/A';

  return (
    <div className="w-full max-w-4xl bg-gradient-to-br from-brand-navy to-[#1a3a5e] text-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row my-6 relative border border-brand-gold/30">

      {/* === Phần Trang Trí (optional) === */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pattern-grid"></div>
      <style jsx>{`
        .pattern-grid {
          background-image: linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        /* Hiệu ứng đường cắt */
        .ticket-tear-line::before, .ticket-tear-line::after {
          content: '';
          position: absolute;
          width: 24px; /* Kích thước lỗ tròn */
          height: 24px;
          background: #202E61; /* Cần khớp với màu nền body/container */
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.3); /* Viền vàng nhạt */
        }
        .ticket-tear-line::before { top: -12px; } /* Nửa trên */
        .ticket-tear-line::after { bottom: -12px; } /* Nửa dưới */
        /* Áp dụng cho mobile (top/bottom) */
        .ticket-tear-line-mobile { left: -12px; } /* Bên trái */
        .ticket-tear-line-mobile-right { right: -12px; } /* Bên phải */

         /* Áp dụng cho desktop (left/right) */
        @media (min-width: 768px) {
           .ticket-tear-line { right: -12px; left: auto; } /* Chuyển sang bên phải */
           .ticket-tear-line-mobile { display: none; } /* Ẩn lỗ trên/dưới mobile */
           .ticket-tear-line-mobile-right { display: none; }
        }
        .status-badge {
          padding: 3px 10px; /* Tăng padding nhẹ */
          border-radius: 9999px;
          font-size: 0.8rem; /* Hơi lớn hơn xs */
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: inline-flex; /* Dùng inline-flex để icon và text căn giữa */
          align-items: center; /* Căn icon và text theo chiều dọc */
          gap: 4px; /* Khoảng cách giữa icon và text */
          margin-left: 12px; /* Khoảng cách với ticket_id */
          vertical-align: middle;
        }
      `}</style>

      {/* === Phần Thông Tin Sự Kiện (Bên Trái/Trên) === */}
      <div className="p-6 md:p-8 md:w-[350px] bg-gradient-to-br from-white to-brand-gold text-brand-navy flex flex-col items-center justify-between text-center relative flex-shrink-0">
        <div>
          <img src="/assets/imgs/LogoMediacal.png" alt="Event Logo" className="h-10 mb-5 mx-auto" /> {/* Logo tối màu trên nền vàng */}
          <h3 className="md:text-xl text-lg font-bold uppercase mb-2 leading-tight">{t('hero.title', 'HIMA 2025')}</h3>
          <p className="md:text-xl text-lg font-bold">{t('hero.subtitle')}</p>
          <p className="md:text-md text-sm opacity-90 font-medium">{t('hero.tagline', 'Minh bạch pháp lý – Giá trị Y khoa')}</p>
        </div>
        <div className="mt-4 md:text-md text-sm opacity-80 w-full">
            <p className="font-semibold">{t('keyInfo.date', '21/11/2025')}</p>
            <p>{t('keyInfo.locationShort', 'Melia Hotel, Hanoi')}</p>
        </div>
        {/* Đường cắt mobile */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%+24px)] md:hidden">
             <div className="relative h-px bg-transparent">
                 <div className="absolute top-1/2 left-0 w-full h-[2px] border-t border-dashed border-brand-navy/50"></div>
                 <div className="absolute ticket-tear-line-mobile"></div>
                 <div className="absolute ticket-tear-line-mobile-right"></div>
             </div>
        </div>
      </div>

      {/* === Đường Cắt Giữa (Desktop) === */}
      <div className="hidden md:block w-px bg-transparent relative flex-shrink-0">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px] border-l border-dashed border-white/30"></div>
         <div className="absolute ticket-tear-line"></div> {/* Lỗ tròn */}
      </div>

      {/* === Phần Thông Tin Thành Viên (Bên Phải/Dưới) === */}
      <div className="p-6 md:p-8 flex-grow relative z-10 space-y-2.5">
          <h4 className="md:text-2xl text-xl font-semibold text-brand-gold mb-4 border-b border-brand-gold/30 pb-2">{t('memberTicket.ticketInfo', 'Thông Tin Vé Tham Dự')}</h4>
          {/* Lặp qua các trường để hiển thị */}
          {Object.entries(fieldLabels).map(([key, label]) => {
              let value = memberInfo[key];
              if (key === 'field') value = translatedField;
              if (key === 'guest_type') value = translatedGuestType;
              if (key === 'created_at') value = formattedCreatedAt;

              // Bỏ qua ticket_id và ticket_status ở đây
              if (!value || key === 'ticket_id' || key === 'ticket_status') {
                return null;
              }

              return (
                  <div key={key} className="flex flex-col sm:flex-row md:text-lg text-md">
                      <span className="font-bold text-gray-300 w-full sm:w-1/2 md:w-1/3 flex-shrink-0 mb-0.5 sm:mb-0">{label}:</span>
                      <span className="font-light text-white break-words">{value}</span>
                  </div>
              );
          })}

          {/* Hiển thị Mã vé, Trạng thái vé và QR Code */}
          <div className="mt-5 pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className='text-center sm:text-left w-full'>
                  {/* Mã vé và Trạng thái vé */}
                  <div className='mb-2 flex items-center flex-wrap justify-between'>
                    <div>
                      <p className='text-xs text-gray-400'>{fieldLabels.ticket_id}:</p>
                      <p className='font-bold md:text-2xl text-xl text-brand-gold tracking-wider inline-block'>{memberInfo.ticket_id || 'N/A'}</p>
                    </div>
                    {/* Badge Trạng thái vé */}
                    <span className={`status-badge ${ticketStatusDisplay.bgColor} ${ticketStatusDisplay.textColor}`}>
                       <i className={`${ticketStatusDisplay.icon} text-xs`}></i> {/* Thêm icon */}
                       <span>{ticketStatusDisplay.text}</span>
                    </span>
                  </div>
              </div>
              {/* Mã QR */}
              {memberInfo.ticketQrCode && (
                  <div className="text-center mt-4 sm:mt-0 flex-shrink-0">
                      <img src={memberInfo.ticketQrCode} alt="Ticket QR Code" className="w-24 h-24 mx-auto bg-white p-1 rounded shadow" />
                      <p className="text-xs mt-1 text-gray-400">{t('memberTicket.scanInfo', 'Quét mã khi check-in')}</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default MemberTicket;