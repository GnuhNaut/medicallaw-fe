import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import viTranslation from './locales/vi.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  vi: {
    translation: viTranslation,
  },
};

i18n
  // Thư viện này sẽ tự động phát hiện ngôn ngữ của trình duyệt
  .use(LanguageDetector)
  // Chuyển i18n instance vào react-i18next
  .use(initReactI18next)
  .init({
    resources,
    // lng: 'vi',
    // Ngôn ngữ mặc định nếu không phát hiện được ngôn ngữ nào
    // Hoặc nếu ngôn ngữ được phát hiện không được hỗ trợ (vd: 'fr', 'de')
    fallbackLng: 'en',
    
    // Các ngôn ngữ được hỗ trợ
    supportedLngs: ['vi', 'en'],

    interpolation: {
      escapeValue: false, // React đã có cơ chế chống XSS
    },

    detection: {
      // Thứ tự ưu tiên phát hiện ngôn ngữ:
      // 1. Kiểm tra trên URL (vd: ?lng=en)
      // 2. Kiểm tra trong cookie
      // 3. Kiểm tra trong localStorage
      // 4. Lấy ngôn ngữ từ thẻ <html>
      // 5. Lấy ngôn ngữ từ trình duyệt (navigator)
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie', 'localStorage'], // Lưu lựa chọn của người dùng vào đâu
    }
  });

export default i18n;