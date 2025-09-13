import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Globe, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { websiteInfo } from '../../data/website/info';

// Import language files statically
import enHeader from './en/header.json';
import zhHeader from './zh/header.json';
import jaHeader from './ja/header.json';
import esHeader from './es/header.json';

// Create a language map
const languageMap = {
  en: enHeader,
  zh: zhHeader,
  ja: jaHeader,
  es: esHeader,
};

interface HeaderContent {
  logoAlt: string;
  nav: {
    teams: string;
    fans: string;
    titanGps: string;
    liveGames: string;
    analytics: string;
    makeGames: string;
    login: string;
    signup: string;
    logout: string;
  };
  languageSelector: {
    heading: string;
    changeLanguageLabel: string;
  };
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [pageContent, setPageContent] = useState<HeaderContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useAuth();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();

  // Set favicon dynamically
  useEffect(() => {
    const setFavicon = () => {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = websiteInfo?.favicon ?? '/favicon.ico';
    };

    setFavicon();
  }, []);

  // Load language content
  useEffect(() => {
    const loadContent = () => {
      setIsLoading(true);
      try {
        const content = languageMap[currentLanguage?.code as keyof typeof languageMap] ?? languageMap.en;
        setPageContent(content);
      } catch (err) {
        console.error(`Failed to load ${currentLanguage?.code} content:`, err);
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    setTimeout(() => setIsLanguageOpen(false), 200);
  };

  if (isLoading) {
    return (
      <div className="h-16 flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!pageContent) {
    return (
      <div className="h-16 flex items-center justify-center bg-black">
        <p className="text-sm font-semibold text-white">
          Content not available
        </p>
      </div>
    );
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-black shadow-lg sticky top-0 z-50 border-b-2 border-blue-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Logo and Website Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={websiteInfo?.logo ?? '/logo.png'}
                alt={pageContent.logoAlt.replace('{websiteName}', websiteInfo?.name ?? 'GameForge Studio')}
                className="w-8 h-8 rounded"
              />
              <span
                className="text-xl font-bold text-white"
              >
                {websiteInfo?.name ?? 'GameForge Studio'}
              </span>
            </Link>
          </div>

          {/* Right Side - All other elements */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/services"
                className="text-sm font-medium hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors text-white"
              >
                      {pageContent.nav.Solutions}
              </Link>
           
            </nav>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                aria-label={pageContent.languageSelector.changeLanguageLabel}
              >
                <Globe size={16} className="text-gray-300" />
                <span className="text-sm text-white">{currentLanguage?.flag ?? '🌐'}</span>
              </button>
              {isLanguageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-lg border border-blue-500 py-2 w-36 z-50"
                >
                  <div className="px-4 py-2 text-sm font-semibold border-b border-blue-500 text-white">
                    {pageContent.languageSelector.heading}
                  </div>
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center space-x-2 transition-colors text-white ${
                        currentLanguage?.code === lang.code ? 'bg-gray-700' : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span
                        className={`text-sm ${
                          currentLanguage?.code === lang.code ? 'text-blue-400' : 'text-white'
                        }`}
                      >
                        {lang.name}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* User Actions */}
            {user?.isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span
                  className="text-sm hidden sm:inline-block text-white"
                >
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  title={pageContent.nav.logout}
                >
                  <LogOut size={16} className="text-gray-300" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border hover:bg-gray-800 transition-colors text-white border-blue-500"
                >
                  {pageContent.nav.login}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white"
                >
                  {pageContent.nav.signup}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t py-4 space-y-4 border-blue-500"
          >
         
            <Link
              to="/services"
              className="block px-4 py-2 hover:bg-gray-800 transition-colors text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {pageContent.nav.Service}
            </Link>
         
            {!user?.isAuthenticated && (
              <div className="flex space-x-2 pt-4 px-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border flex-1 text-center hover:bg-gray-800 transition-colors text-white border-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {pageContent.nav.login}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg flex-1 text-center hover:bg-blue-600 transition-colors text-white"
                  onClick={() => setIsMenuOpen(false)}
                  style={{backgroundColor : "#125B63"}}
                >
                  {pageContent.nav.signup}
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;