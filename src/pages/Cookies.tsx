
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, Shield, Globe } from 'lucide-react';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';
import { colors } from '../data/colors/theme';

// Import language files statically
import zhCookies from '../data/text/zh/cookies.json';
import enCookies from '../data/text/en/cookies.json';
import jaCookies from '../data/text/ja/cookies.json';
import esCookies from '../data/text/es/cookies.json';

// Create a language map
const languageMap = {
  en: enCookies,
  zh: zhCookies,
  ja: jaCookies,
  es: esCookies,
};

interface CookiesContent {
  title: string;
  subtitle: string;
  content: string[];
  sections: {
    title: string;
    content: string;
  }[];
  lastUpdated: string;
}

const Cookies: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [visibleSections, setVisibleSections] = useState<boolean[]>(new Array(4).fill(true));

  // Get page content directly, default to English
  const pageContent = (languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en) as CookiesContent;

  // Process text to replace {website.name}
  const processText = (text: string) => {
    if (typeof text !== 'string' || text == null) {
      console.warn('processText received invalid text:', text);
      return text || '';
    }
    return text.replace(/\{website\.name\}/g, websiteInfo.name);
  };

  // Handle dismissing a section
  const handleDismiss = (index: number) => {
    setVisibleSections((prev) => {
      const newVisible = [...prev];
      newVisible[index] = false;
      return newVisible;
    });
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section icons
  const sectionIcons = [
    <Cookie size={30} className="text-blue-600" />,
    <Settings size={30} className="text-blue-600" />,
    <Shield size={30} className="text-blue-600" />,
    <Globe size={30} className="text-blue-600" />,
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center px-6 py-20 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://cdn.pixabay.com/photo/2023/01/27/06/17/pixel-7746506_1280.jpg')`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1
            className="text-4xl md:text-6xl font-extrabold text-white mb-5 tracking-tight"
            style={{ textShadow: '2px 2px 10px rgba(0, 0, 0, 0.9)' }}
            aria-label={processText(pageContent.title)}
          >
            {processText(pageContent.title)}
          </h1>
          <p
            className="text-lg md:text-xl text-gray-100 font-medium max-w-3xl mx-auto"
            style={{ textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)' }}
          >
            {processText(pageContent.subtitle)}
          </p>
        </motion.div>
      </section>

      {/* Cookies Sections - Timeline Style */}
      <section className="py-24 px-6 relative bg-gray-900">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-600 opacity-30"></div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center mb-20 text-white"
          >
            Cookie Policies for {websiteInfo.name}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-800 rounded-2xl shadow-lg p-8 mb-16 relative z-10 border border-blue-600 hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            {pageContent.content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-base mb-5 leading-relaxed text-gray-200"
              >
                {processText(paragraph)}
              </motion.p>
            ))}
          </motion.div>
          <AnimatePresence>
            {pageContent.sections.map((section, index) => (
              visibleSections[index] && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, transition: { duration: 0.4 } }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border z-10 ${
                    index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                  } w-full md:w-5/12 border-blue-600 hover:scale-105 hover:shadow-xl transition-transform duration-300`}
                >
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full z-20"
                    style={{ [index % 2 === 0 ? 'right' : 'left']: '-1rem' }}
                  ></div>
                  <button
                    onClick={() => handleDismiss(index)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 transition-colors"
                    aria-label="Dismiss section"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="flex items-start space-x-4">
                    {sectionIcons[index]}
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-white">{processText(section.title)}</h3>
                      <p className="text-sm leading-relaxed text-gray-200">{processText(section.content)}</p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          {/* Cookies Consent Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 bg-gray-800 rounded-2xl shadow-lg p-8 relative z-10 border border-blue-600 hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-base md:text-lg font-medium text-white">
                  {currentLanguage.code === 'ja'
                    ? `クッキーポリシーに同意することで、${websiteInfo.name}のサービスを最適に利用できます。`
                    : currentLanguage.code === 'zh'
                    ? `同意我们的Cookie政策以优化使用${websiteInfo.name}的服务。`
                    : `Agree to our Cookie Policy to enhance your experience on ${websiteInfo.name}.`}
                </p>
                <p className="text-sm text-gray-400 mt-2">Last Updated: {pageContent.lastUpdated}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  className="px-6 py-2 rounded-lg border font-medium transition-colors hover:bg-blue-600 hover:text-white"
                  style={{ borderColor: '#2563eb', color: '#2563eb' }}
                >
                  {currentLanguage.code === 'ja' ? '詳細' : currentLanguage.code === 'zh' ? '详情' : 'Details'}
                </button>
                <button
                  className="px-6 py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#2563eb' }}
                >
                  {currentLanguage.code === 'ja' ? '同意する' : currentLanguage.code === 'zh' ? '接受' : 'Accept'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
};

export default Cookies;

