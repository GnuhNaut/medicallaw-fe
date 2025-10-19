import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Countdown = () => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const countdownDate = new Date("Nov 21, 2025 07:30:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setIsOver(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
          seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0'),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (isOver) {
    return <div className='col-span-4 text-2xl font-bold text-white'>{t('hero.eventOver')}</div>;
  }

  if (!timeLeft) {
    return null; // or a loading spinner
  }

  return (
    <div id="countdown" className="grid grid-cols-4 gap-4 md:gap-6 max-w-xl mx-auto mb-12 text-center">
      <div className="w-20 h-20 md:w-28 md:h-28 flex flex-col justify-center items-center bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
        <span className="block text-2xl md:text-5xl font-bold">{timeLeft.days}</span>
        <span className="text-sm uppercase tracking-widest">{t('hero.days')}</span>
      </div>
      <div className="w-20 h-20 md:w-28 md:h-28 flex flex-col justify-center items-center bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
        <span className="block text-2xl md:text-5xl font-bold">{timeLeft.hours}</span>
        <span className="text-sm uppercase tracking-widest">{t('hero.hours')}</span>
      </div>
      <div className="w-20 h-20 md:w-28 md:h-28 flex flex-col justify-center items-center bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
        <span className="block text-2xl md:text-5xl font-bold">{timeLeft.minutes}</span>
        <span className="text-sm uppercase tracking-widest">{t('hero.minutes')}</span>
      </div>
      <div className="w-20 h-20 md:w-28 md:h-28 flex flex-col justify-center items-center bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
        <span className="block text-2xl md:text-5xl font-bold">{timeLeft.seconds}</span>
        <span className="text-sm uppercase tracking-widest">{t('hero.seconds')}</span>
      </div>
    </div>
  );
};

export default Countdown;