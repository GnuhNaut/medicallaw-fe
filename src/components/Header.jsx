import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const changeLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
    setMenuOpen(false); // Close menu on language change
  };

  const NavLink = ({ to, children, className }) => (
    <HashLink 
      smooth 
      to={`/${to}`}
      className={className || "text-gray-700 hover:text-brand-gold transition"}
      onClick={() => setMenuOpen(false)}
    >
      {children}
    </HashLink>
  );

  const MobileNavLink = ({ to, children }) => (
     <HashLink 
      smooth 
      to={`/${to}`}
      className="block px-6 py-3 text-gray-700 hover:bg-gray-100"
      onClick={() => setMenuOpen(false)}
    >
      {children}
    </HashLink>
  );

  const flagSrc = i18n.language === 'vi' 
    ? "https://flagcdn.com/w40/us.png" 
    : "https://flagcdn.com/w40/vn.png";

  const flagSrcSet = i18n.language === 'vi' 
    ? "https://flagcdn.com/w80/us.png 2x" 
    : "https://flagcdn.com/w80/vn.png 2x";

  return (
    <header id="header" className="bg-white backdrop-blur-lg sticky top-0 z-50 transition-all duration-300">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-brand-navy tracking-wider">
          <img src="/assets/imgs/LogoMediacal.png" className="h-[60px]" alt="Medicallaw Logo" />
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center font-semibold">
          <NavLink to="#gioi-thieu">{t('header.about')}</NavLink>
          <NavLink to="#chuong-trinh">{t('header.agenda')}</NavLink>
          <NavLink to="#dien-gia">{t('header.speakers')}</NavLink>
          <NavLink to="#ve-moi">{t('header.tickets')}</NavLink>
          {/* <Link to="/payment" className="text-gray-700 hover:text-brand-gold transition">{t('header.payment')}</Link> */}
          <NavLink to="#dang-ky" className="relative z-10 shimmer-btn bg-brand-gold text-white font-bold py-2 px-6 rounded-full hover:bg-brand-gold-dark transition shadow-lg">{t('header.register')}</NavLink>
          <button onClick={changeLanguage} title={t('header.lang')} className="flex items-center text-gray-700 hover:text-brand-gold transition">
            <img src={flagSrc} srcSet={flagSrcSet} width="40" alt="Language flag" />
          </button>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button id="mobile-menu-button" onClick={() => setMenuOpen(!isMenuOpen)} className="text-brand-navy focus:outline-none">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white pb-3">
          <MobileNavLink to="#gioi-thieu">{t('header.about')}</MobileNavLink>
          <MobileNavLink to="#chuong-trinh">{t('header.agenda')}</MobileNavLink>
          <MobileNavLink to="#dien-gia">{t('header.speakers')}</MobileNavLink>
          <MobileNavLink to="#ve-moi">{t('header.tickets')}</MobileNavLink>
          {/* <Link to="/payment" className="block px-6 py-3 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>{t('header.payment')}</Link> */}
          <div className="px-6 py-3">
            <button onClick={changeLanguage} className="flex items-center text-gray-700 hover:bg-gray-100 w-full">
              <img src={flagSrc} srcSet={flagSrcSet} width="40" alt="Language flag" />
            </button>
          </div>
          <MobileNavLink to="#dang-ky" className="block mx-4 my-3 bg-brand-gold text-white text-center font-bold py-3 rounded-full">{t('header.register')}</MobileNavLink>
        </div>
      )}
    </header>
  );
};

export default Header;