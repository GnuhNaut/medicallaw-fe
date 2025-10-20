import React from 'react';
import { useTranslation } from 'react-i18next';

const sponsorsList = [
  { name: 'An Binh', src: '/assets/imgs/partner/anbinh.png' },
  { name: 'Elenova', src: '/assets/imgs/partner/Elenova.png' },
  { name: 'MASolution', src: '/assets/imgs/partner/masolution.jpg' },
  { name: 'Pharmalink', src: '/assets/imgs/partner/pmlvn-1686101475.png' },
  { name: 'BioPharma', src: '/assets/imgs/partner/bio.webp' },
  { name: 'Blue Eagle', src: '/assets/imgs/partner/blue.jpg' },
  { name: 'Thai Ha Eye', src: '/assets/imgs/partner/thaihaeye.jpg' },
  { name: 'Viet Tin Dental', src: '/assets/imgs/partner/viettindental.jpg', isUp: true },
  { name: 'IVF Ha Noi', src: '/assets/imgs/partner/ivfhn.png' },
  { name: 'IMP', src: '/assets/imgs/partner/imp.jpg' },
  { name: 'Tam Anh', src: '/assets/imgs/partner/ta.jpg', isUp: true },
  { name: 'Bao Dau tu', src: '/assets/imgs/partner/baodautu.jpg', isUp: true },
  { name: 'Benh Vien Phuong Dong', src: '/assets/imgs/partner/phuongdong.jpg', isUp: true },
  { name: 'Hiep Hoi Benh vien tu nhan', src: '/assets/imgs/partner/hiephoibenhvien.jpg' },
];

const SponsorsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="tai-tro">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-4 tracking-normal">{t('sponsors.title')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('sponsors.description')}</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
          {sponsorsList.map(sponsor => (
            <div key={sponsor.name} className="h-24 bg-white rounded-lg flex items-center justify-center transition hover:shadow-lg hover:scale-105">
              <img src={sponsor.src} alt={sponsor.name} className={"h-20 w-auto object-cover "+ (sponsor.isUp && "scale-150")} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;