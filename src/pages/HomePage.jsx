import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Countdown from '../components/Countdown';
import AboutSection from '../components/AboutSection';
import KeyInfoSection from '../components/KeyInfoSection';
import AgendaSection from '../components/AgendaSection';
import SpeakersSection from '../components/SpeakersSection';
import BenefitsSection from '../components/BenefitsSection';
import TicketsSection from '../components/TicketsSection';
import VenueSection from '../components/VenueSection';
import SponsorsSection from '../components/SponsorsSection';
import RegistrationForm from '../components/RegistrationForm';

const HomePage = () => {
  const { t } = useTranslation();

  // Hook để thêm các script bên ngoài
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
    script.onload = () => {
      window.particlesJS('particles-js', {"particles":{"number":{"value":50,"density":{"enable":true,"value_area":800}},"color":{"value":["#0a2540","#14b8a6"]},"shape":{"type":"circle"},"opacity":{"value":0.6,"random":true},"size":{"value":3,"random":true},"line_linked":{"enable":true,"distance":150,"color":"#0d3b66","opacity":0.2,"width":1},"move":{"enable":true,"speed":1.5,"direction":"none","random":true,"straight":false,"out_mode":"out","bounce":false}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"},"onclick":{"enable":false},"resize":true},"modes":{"grab":{"distance":140,"line_linked":{"opacity":0.4}}}},"retina_detect":true});
    };
    document.body.appendChild(script);

    // Clean up
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <main>
      <div id="particles-js" style={{ position: 'fixed', width: '100%', height: '100%', zIndex: -1 }}></div>
      <section className="hero-container relative text-white" style={{ 
        backgroundImage: "url('/assets/imgs/banner-medicalaw.jpg')", 
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center center' 
      }}>
        <div className="absolute inset-0 bg-[#1E2760] opacity-70 z-[1]"></div>
        <img src="/assets/imgs/logo.png" className="absolute top-0 left-[50%] -translate-x-[50%] z-[1]" alt="" />
        <div className="hero-content container mx-auto px-4 py-20 md:py-36 text-center flex flex-col items-center relative z-[2]">
          <h1 className="text-2xl md:text-5xl font-black mb-6 tracking-normal uppercase !leading-[1.3] md:w-4/5">
            {t('hero.title')} <br /> 
            <span className="text-brand-gold">{t('hero.subtitle')}</span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-4 text-brand-gold timetable"><i>{t('hero.firstTime')}</i></p>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-10 uppercase">{t('hero.tagline')}</p>
          <Countdown />
          <a href="#dang-ky" className="relative z-10 shimmer-btn bg-brand-gold text-white font-bold py-4 px-12 text-lg rounded-full hover:bg-brand-gold-dark transition-all duration-300 transform hover:scale-110 shadow-2xl">
            <i className="fas fa-ticket-alt mr-2"></i> {t('hero.registerButton')}
          </a>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-24">
        <AboutSection />
        <KeyInfoSection />
        <AgendaSection />
        <SpeakersSection />
        <BenefitsSection />
        <TicketsSection />
        <VenueSection />
        <SponsorsSection />
      </div>
      <div className="pt-20 pb-8 bg-[#101332] text-white mt-24">
        <RegistrationForm />
        {/* Footer sẽ được render bởi App.jsx, không cần ở đây */}
      </div>

    </main>
  );
};

export default HomePage;