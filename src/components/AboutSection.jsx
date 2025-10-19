import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

//   const featuredProjects = t('about.featuredProjects', { returnObjects: true });

  const slides = [
    {
      type: 'conference',
      content: (
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img src="/assets/imgs/hoinghi.webp" alt="Hội nghị Y tế" className="rounded-2xl shadow-xl w-full h-auto object-cover" />
          </div>
          <div className="space-y-8">
            <h3 className="text-3xl md:text-5xl font-extrabold text-brand-navy mb-4 tracking-normal">{t('about.conferenceTitle')}</h3>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              {/* <p>{t('about.conferenceDescription')}</p> */}
              <p dangerouslySetInnerHTML={{ __html: t('about.conferenceDescription') }} />
            </div>
          </div>
        </div>
      )
    },
    {
      type: 'conference',
      content: (
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img src="/assets/imgs/aboutm.avif" alt="Hội nghị Y tế" className="rounded-2xl shadow-xl w-full h-auto object-cover" />
          </div>
          <div className="space-y-8">
            <h3 className="text-3xl md:text-5xl font-extrabold text-brand-navy mb-4 tracking-normal">{t('about.medicallawTitle')}</h3>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p dangerouslySetInnerHTML={{ __html: t('about.medicallawDescription') }} />
            </div>
          </div>
        </div>
      )
    },
    {
      type: 'conference',
      content: (
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img src="/assets/imgs/about1to1.jpg" alt="Hội nghị Y tế" className="rounded-2xl shadow-xl w-full h-auto object-cover" />
          </div>
          <div className="space-y-8 to1-list">
            <h3 className="text-3xl md:text-5xl font-extrabold text-brand-navy mb-4 tracking-normal">{t('about.1to1Title')}</h3>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p dangerouslySetInnerHTML={{ __html: t('about.1to1Description') }} />
            </div>
          </div>
        </div>
      )
    },
    // ...featuredProjects.map(project => ({
    //   type: 'project',
    //   content: (
    //     <div className="grid lg:grid-cols-2 gap-12 items-center">
    //       <div>
    //         <img src={project.image} alt={project.name} className="rounded-2xl w-full h-auto object-cover" />
    //       </div>
    //       <div className="space-y-8">
    //         <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-4 tracking-normal">{t('about.projectsTitle')}</h3>
    //         <h4 className="text-2xl md:text-3xl font-bold text-brand-gold mb-6">{project.name}</h4>
    //       </div>
    //     </div>
    //   )
    // }))
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section id="gioi-thieu">
      <div className="bg-white md:p-12 p-6 rounded-3xl shadow-lg">
        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy my-4 tracking-normal text-center">{t('about.title')}</h2>
        <div className="integrated-slideshow relative overflow-visible rounded-3xl p-5">
          <div className="slideshow-container relative w-full h-[700px] overflow-auto">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                {slide.content}
              </div>
            ))}
          </div>
          <div className="slideshow-nav absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-0 pointer-events-none z-20">
            <button onClick={prevSlide} className="slideshow-nav-btn prev -ml-4 bg-white/90 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg pointer-events-auto hover:scale-110 transition-transform">
              <i className="fas fa-chevron-left text-brand-navy text-xl"></i>
            </button>
            <button onClick={nextSlide} className="slideshow-nav-btn next -mr-4 bg-white/90 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg pointer-events-auto hover:scale-110 transition-transform">
              <i className="fas fa-chevron-right text-brand-navy text-xl"></i>
            </button>
          </div>
          <div className="slideshow-indicators flex justify-center gap-2 mt-10">
            {slides.map((_, index) => (
              <span
                key={index}
                onClick={() => goToSlide(index)}
                className={`indicator w-3 h-3 rounded-full border-2 border-brand-navy cursor-pointer transition-all ${currentSlide === index ? 'bg-brand-navy scale-125' : 'bg-white/50'}`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;