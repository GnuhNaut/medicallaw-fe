// src/components/FloatingActionButton.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const FloatingActionButton = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const fabRef = useRef(null);

  // Xử lý đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fabRef.current && !fabRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={fabRef} className="floating-container fixed bottom-5 right-5 flex flex-col items-center z-[1000]">
      {/* Các lựa chọn con */}
      <div className={`flex flex-col gap-2.5 mb-2.5 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <a className="btn-hotline w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg relative group" href="tel:0559322322" title="Gọi Hotline">
          <img src="/assets/icons/phone.svg" alt="Hotline" className="w-[30px] h-[30px]" />
          <span className="absolute right-14 whitespace-nowrap text-sm text-gray-800 bg-white/95 py-1.5 px-2.5 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">{t('fab.call')}</span>
        </a>
        <a className="btn-zalo w-12 h-12 rounded-full flex bg-white items-center justify-center shadow-lg relative group" href="https://zalo.me/0559322322" target="_blank" rel="noopener noreferrer" title="Mở Zalo">
          <img src="/assets/icons/zalo.svg" alt="Zalo" className="w-[30px] h-[30px]" />
          <span className="absolute right-14 whitespace-nowrap text-sm text-gray-800 bg-white/95 py-1.5 px-2.5 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">{t('fab.zalo')}</span>
        </a>
        <a className="btn-facebook w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg relative group" href="https://www.facebook.com/profile.php?id=100086742171871" target="_blank" rel="noopener noreferrer" title="Mở Facebook">
          <img src="/assets/icons/facebook.svg" alt="Facebook" className="w-[30px] h-[30px]" />
          <span className="absolute right-14 whitespace-nowrap text-sm text-gray-800 bg-white/95 py-1.5 px-2.5 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">{t('fab.facebook')}</span>
        </a>
      </div>

      {/* Nút chính */}
      <button className="floating-button-main w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer border-2 border-brand-gold" onClick={() => setIsOpen(!isOpen)}>
        <img id="toggle-icon" src="/assets/icons/support.svg" alt="Support" className="w-[36px] h-[36px] transition-transform duration-300" />
      </button>
    </div>
  );
};

export default FloatingActionButton;