import React from 'react';
import { useTranslation } from 'react-i18next';

const TicketsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="ve-moi">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-4 tracking-normal">{t('tickets.title')}</h2>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center flex flex-col border-2 border-gray-200 hover:border-brand-gold hover:shadow-2xl transition duration-300 bg-cover bg-center" style={{ backgroundImage: "url('/assets/imgs/BG.jpg')" }}>
            <h3 className="text-2xl font-bold text-brand-gold uppercase">{t('tickets.invitation')}</h3>
            <p className="text-brand-teal font-semibold text-lg mb-4">{t('tickets.invitationOnly')}</p>
            <p className="text-white mb-6 flex-grow">{t('tickets.invitationDesc')}</p>
            <a href="tel:0914266688" className="mt-auto shimmer-btn bg-brand-gold text-white font-bold py-3 px-6 rounded-full hover:bg-brand-gold-dark transition"><span>{t('tickets.plsContact')}</span> <br />{t('tickets.invitationContact')}</a>
          </div>
          <div className="bg-[#101332] text-white rounded-2xl shadow-2xl p-8 text-center flex flex-col border-2 border-brand-gold">
            <h3 className="text-2xl font-bold text-white uppercase">{t('tickets.member')}</h3>
            <p className="text-brand-gold font-semibold text-lg mb-4">{t('tickets.earlyBird')}</p>
            <p className="text-gray-300 mb-6 flex-grow">{t('tickets.memberDesc')}</p>
            <div className="my-8"><span className="text-2xl md:text-4xl font-bold text-white">{t('tickets.price')}</span></div>
            <a href="#dang-ky" className="mt-auto shimmer-btn bg-brand-gold text-white font-bold py-3 px-6 rounded-full hover:bg-brand-gold-dark transition">{t('tickets.registerNow')}</a>
            <span className="text-xs pt-3 text-brand-gold"><i>{t('tickets.note')}</i></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TicketsSection;