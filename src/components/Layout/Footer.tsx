import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// Import all language files statically
import enFooter from './en/footer.json';
import jaFooter from './ja/footer.json';
import zhFooter from './zh/footer.json';
import esFooter from './es/footer.json';
import { websiteInfo } from '../../data/website/info';

// Create a language map
const languageMap = {
  en: enFooter,
  ja: jaFooter,
  zh: zhFooter,
  es: esFooter
};

interface FooterContent {
  brand: {
    nameAlt: string;
    slogan: string;
  };
  sections: {
    title: string;
    links: {
      path: string;
      label: string;
    }[];
  }[];
  social: {
    links: {
      name: string;
      link: string;
    }[];
  };
  copyright: {
    text: string;
    privacy: string;
    cookies: string;
    terms: string;
  };
}

const Footer: React.FC = () => {
  const { currentLanguage } = useLanguage();

  // Get page content directly from languageMap, default to English if not found
  const pageContent: FooterContent = languageMap[currentLanguage.code as keyof typeof languageMap] || languageMap.en;

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white text-blue-800 py-6"
      style={{ zIndex: 99 }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
    
        {/* About Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">About us</h3>
          <ul className="space-y-1">
            <li><Link to="/faqs" className="text-sm hover:underline">FAQs</Link></li>
            <li><Link to="/login" className="text-sm hover:underline">Login</Link></li>
            <li><Link to="/my-account" className="text-sm hover:underline">My Account</Link></li>
            <li><Link to="/recovery" className="text-sm hover:underline">Recovery</Link></li>
            <li><Link to="/art-loss-register" className="text-sm hover:underline">The Art Loss Register</Link></li>
            <li><Link to="/contact-us" className="text-sm hover:underline">Contact us</Link></li>
          </ul>
        </div>

        
        {/* Auction Houses Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Auction Houses</h3>
          <ul className="space-y-1">
            <li><Link to="/dealers" className="text-sm hover:underline">Dealers</Link></li>
            <li><Link to="/insurers" className="text-sm hover:underline">Insurers</Link></li>
            <li><Link to="/law-enforcement" className="text-sm hover:underline">Law Enforcement</Link></li>
            <li><Link to="/pawnbrokers" className="text-sm hover:underline">Pawnbrokers</Link></li>
            <li><Link to="/private-individuals" className="text-sm hover:underline">Private Individuals</Link></li>
          </ul>
        </div>

        {/* Policies Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Policies</h3>
          <ul className="space-y-1">
            <li><Link to="/search-tcs" className="text-sm hover:underline">Search T&Cs</Link></li>
            <li><Link to="/loss-registration-tcs" className="text-sm hover:underline">Loss Registration T&Cs</Link></li>
            <li><Link to="/privacy-policy" className="text-sm hover:underline">Privacy Policy</Link></li>
            <li><Link to="/cookie-policy" className="text-sm hover:underline">Cookie Policy</Link></li>
          </ul>
        </div>


            {/* Logo and Contact Info */}
        <div className="mb-6 md:mb-0">
          <div className="flex items-center space-x-2 mb-4">
            <img src="/path/to/logo.png" alt={pageContent.brand.nameAlt} className="h-8" />
            <span className="text-lg font-bold">The Watch Register</span>
          </div>
          <p className="text-sm">The International Art and Antique Loss Register Limited<br />16 Black Friars Lane, London EC4V 6EB, UK</p>
          <p className="text-sm mt-2">+44 (0)20 7842 6900</p>
        </div>

   
   
   
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 mt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">©2025 The Watch Register. Registered office: The International Art and Antique Loss Register Limited, 16 Black Friars Lane, London EC4V 6EB, UK</p>
       
        </div>
    </motion.footer>
  );
};

export default Footer;