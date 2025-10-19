import React from 'react';
import { useTranslation } from 'react-i18next';

const KeyInfoSection = () => {
  const { t } = useTranslation();

  return (
    <section id="thong-tin-chinh">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white text-center p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
          <div className="text-5xl text-brand-teal mb-5"><i className="fas fa-calendar-alt"></i></div>
          <h3 className="text-2xl font-bold text-brand-navy mb-2">{t('keyInfo.time')}</h3>
          <p className="text-lg text-gray-600">{t('keyInfo.date')}</p>
        </div>
        <a href="https://maps.google.com/?q=MELIÁ+HA+NOI+HOTEL" target="_blank" rel="noopener noreferrer">
          <div className="bg-white text-center p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-transform duration-300 h-full">
            <div className="text-5xl text-brand-teal mb-5"><i className="fas fa-map-marker-alt"></i></div>
            <h3 className="text-2xl font-bold text-brand-navy mb-2">{t('keyInfo.venue')}</h3>
            <p className="text-lg text-gray-600">{t('keyInfo.location')}</p>
          </div>
        </a>
        <div className="bg-white text-center p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
          <div className="text-5xl text-brand-teal mb-5"><i className="fas fa-users"></i></div>
          <h3 className="text-2xl font-bold text-brand-navy mb-2">{t('keyInfo.mediaSponsor')}</h3>
          <p className="text-lg text-gray-600">{t('keyInfo.mediaName')}</p>
        </div>
      </div>
    </section>
  );
};

export default KeyInfoSection;