import React from 'react';
import { useTranslation } from 'react-i18next';

const SpeakerCard = ({ image, name, role }) => (
  <div className="group">
    <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-5">
      <img className="w-full h-full object-cover rounded-full shadow-xl transition-all duration-500" src={image} alt={name} loading="lazy" />
      <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-brand-gold transition-all duration-300 scale-90 group-hover:scale-100"></div>
    </div>
    <h4 className="font-bold text-md text-brand-navy">{name}</h4>
    <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: role }}></p>
  </div>
);

const SpeakersSection = () => {
  const { t } = useTranslation();

  const speakers = [
    { image: '/assets/imgs/boyte.svg', name: t('speakers.moh'), role: t('speakers.mohRole') },
    { image: '/assets/imgs/mrnhu.jpg', name: t('speakers.mrNhu'), role: t('speakers.mrNhuRole') },
    { image: '/assets/imgs/mrbrian.jpg', name: t('speakers.mrBrian'), role: t('speakers.mrBrianRole') },
    { image: '/assets/imgs/quy.png', name: t('speakers.investor'), role: t('speakers.investorRole') },
  ];

  return (
    <section id="dien-gia">
      <div className="bg-white p-8 md:p-12 md:px-6 rounded-3xl shadow-lg">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-4 tracking-normal">{t('speakers.title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-center">
          {speakers.map(speaker => <SpeakerCard key={speaker.name} {...speaker} />)}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;