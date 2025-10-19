import React from 'react';
import { useTranslation } from 'react-i18next';

const BenefitItem = ({ icon, title, desc }) => (
  <div className="bg-[#101332] p-8 rounded-2xl flex items-start space-x-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
    <i className={`fas ${icon} text-4xl text-brand-teal mt-1`}></i>
    <div>
      <h3 className="text-xl font-bold text-brand-teal mb-2">{title}</h3>
      <p className="text-white">{desc}</p>
    </div>
  </div>
);

const BenefitsSection = () => {
  const { t } = useTranslation();

  const benefits = [
    { icon: 'fa-chart-line', title: t('benefits.item1Title'), desc: t('benefits.item1Desc') },
    { icon: 'fa-hands-helping', title: t('benefits.item2Title'), desc: t('benefits.item2Desc') },
    { icon: 'fa-network-wired', title: t('benefits.item3Title'), desc: t('benefits.item3Desc') },
    { icon: 'fa-file-alt', title: t('benefits.item4Title'), desc: t('benefits.item4Desc') },
    { icon: 'fa-gem', title: t('benefits.item5Title'), desc: t('benefits.item5Desc') },
    { icon: 'fa-handshake-angle', title: t('benefits.item6Title'), desc: t('benefits.item6Desc') },
  ];

  return (
    <section id="quyen-loi">
      <div className="bg-white p-6 md:p-12 rounded-3xl shadow-lg">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-4 tracking-normal">{t('benefits.title')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('benefits.description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {benefits.map(benefit => <BenefitItem key={benefit.title} {...benefit} />)}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;