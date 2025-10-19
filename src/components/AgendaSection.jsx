// src/components/AgendaSection.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const TimelineItem = ({ startTime, endTime, title, note, highlighted = false }) => (
  <div className="flex gap-x-6 sm:gap-x-8">
    {/* Cột Thời gian */}
    <div className="flex flex-col items-center shrink-0">
      <p className="font-semibold text-brand-navy">{startTime}</p>
      <div className="w-px h-full bg-gray-300 my-1"></div>
      <p className="font-semibold text-brand-navy">{endTime}</p>
    </div>
    
    {/* Cột Nội dung */}
    <div className={`w-full p-6 rounded-2xl transition duration-300 border-l-4 ${highlighted ? 'bg-brand-cream/90 border-brand-gold' : 'bg-gray-50 border-brand-navy'}`}>
      <h4 className="font-bold text-lg sm:text-xl text-brand-navy">{title}</h4>
      {note && <p className="text-gray-600 mt-2 text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: note }}></p>}
    </div>
  </div>
);

const AgendaSection = () => {
  const { t, i18n } = useTranslation();
  const agendaFile = i18n.language === 'vi' ? '/assets/Agenda-vn.pdf' : '/assets/Agenda-eng.pdf';
  const agendaData = t('agenda.parts', { returnObjects: true });

  return (
    <section id="chuong-trinh">
      <div className="bg-white p-6 md:p-12 rounded-3xl shadow-lg">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-4 tracking-normal">{t('agenda.title')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('agenda.description')}</p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-10">
          {agendaData.map((part, partIndex) => (
            <div key={partIndex}>
              <h3 className="text-brand-navy font-bold text-2xl pb-6">{part.title}</h3>
              <div className="space-y-6">
                {part.items.map((item, itemIndex) => (
                  <TimelineItem key={itemIndex} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href={agendaFile} download className="shimmer-btn bg-brand-navy text-white font-bold px-4 py-4 md:px-10 rounded-full hover:bg-black transition">
            <i className="fas fa-download mr-2"></i> {t('agenda.download')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;