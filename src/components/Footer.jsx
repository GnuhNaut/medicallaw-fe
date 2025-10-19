import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();

  const isVietnamese = i18n.language === 'vi';

  return (
    <footer className="bg-[#101332] text-white pt-12 pb-8">
      <div className="container mx-auto px-6 text-center">
        <h5 className="text-3xl font-bold mb-4 tracking-tight text-white !leading-[1.2] md:w-3/4 text-center mx-auto">
          {t('hero.title')}
          <br/>
          <span className='text-brand-gold'>HIMA 2025</span>
        </h5>
        <h5 className="text-xl font-bold mb-4 tracking-tight text-brand-gold !leading-[1.2] md:w-3/4 text-center mx-auto">
          <i>{t('hero.firstTime')}</i>
        </h5>
        <div className="mb-12">
          <h4 className="text-2xl font-bold mb-6 text-white">{t('footer.contact')}</h4>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h5 className="text-xl font-bold mb-4 text-brand-gold">{t('footer.organizer')}</h5>
              <p className="text-white mb-2"><strong>{t('footer.organizerName')}</strong></p>
              <p className="text-gray-300 mb-1"><i className="fas fa-phone mr-2"></i><strong>{t('footer.hotline')}:</strong> +84 559.322.322 / +84 914.266.688 (Mrs. Huong) / {isVietnamese ? '0911.883.899 (Mr. Cương)' : '+ 84 911.833.899(Mr.Cuong)'}</p>
              <p className="text-gray-300 mb-1"><i className="fas fa-envelope mr-2"></i><strong>{t('footer.email')}:</strong> info@medicallaw.vn</p>
              <p className="text-gray-300 mb-1"><i className="fas fa-globe mr-2"></i><strong>{t('footer.website')}:</strong> https://medicallaw.vn/</p>
              <p className="text-gray-300"><i className="fas fa-map-marker-alt mr-2"></i><strong>{t('footer.address')}:</strong> {t('footer.hanoiAddress')}</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h5 className="text-xl font-bold mb-4 text-brand-gold">{t('footer.venue')}</h5>
              <p className="text-white mb-2"><strong>{t('footer.venueName')}</strong></p>
              <p className="text-gray-300 mb-1"><i className="fas fa-phone mr-2"></i><strong>{t('footer.hotline')}:</strong> 024 3934 3343</p>
              <p className="text-gray-300 mb-1"><i className="fas fa-envelope mr-2"></i><strong>{t('footer.email')}:</strong> rsvn@meliahanoi.com.vn</p>
              <p className="text-gray-300"><i className="fas fa-map-marker-alt mr-2"></i><strong>{t('footer.address')}:</strong> {t('footer.hotelAddress')}</p>
            </div>
          </div>
        </div>
        <div className="text-gray-400 mb-8 max-w-2xl mx-auto">
          <div className="mb-3"><span className="text-gray-400">{t('footer.organizer')}</span> <br/><span className="text-xl font-bold">Medicallaw</span></div>
          <div className="mb-3"><span className="text-gray-400">{t('footer.internationalPartner')}</span> <br/><span className="text-xl font-bold">ONEtoONE Corporate Finance</span></div>
          <div className="mb-3"><span className="text-gray-400">{t('footer.mediaSponsor')}</span> <br/><span className="text-xl font-bold">{t('footer.mediaName')}</span></div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-gray-500 text-sm">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;