import React from 'react';
import { useTranslation } from 'react-i18next';

const VenueSection = () => {
  const { t } = useTranslation();

  return (
    <section id="hoi-truong" className="bg-white p-8 md:p-12 rounded-3xl shadow-lg">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-4 tracking-normal">{t('venue.title')}</h2>
      </div>
      <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
        <img src="/assets/imgs/melia.webp" className="rounded-3xl shadow-md shadow-brand-gold w-full" alt="Khách sạn Melia Hà Nội" loading="lazy" />
        <img src="/assets/imgs/sodo.jpg" className="rounded-3xl shadow-md shadow-brand-gold w-full" alt="Sơ đồ hội trường Melia" loading="lazy" />
      </div>
    </section>
  );
};

export default VenueSection;