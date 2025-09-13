import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { websiteInfo } from '../data/website/info';

// Import language files
import enMedia from '../data/text/en/media.json';
import zhMedia from '../data/text/zh/media.json';
import jaMedia from '../data/text/ja/media.json';
import esMedia from '../data/text/es/media.json';

const languageMap = {
  en: enMedia,
  zh: zhMedia,
  ja: jaMedia,
  es: esMedia,
} as const;

type LanguageCode = keyof typeof languageMap;

const Media = () => {
  const { currentLanguage } = useLanguage();
  const langCode = (currentLanguage?.code in languageMap ? currentLanguage?.code : 'en') as LanguageCode;
  const pageContent = languageMap[langCode];

  const processText = (text: string | undefined | null) => {
    if (typeof text !== 'string' || text == null) {
      console.warn('processText received invalid text:', text);
      return text || '';
    }
    return text.replace(/\{website\.name\}/g, websiteInfo.name);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with Background Image */}
      <section
        className="relative w-full h-80 sm:h-96 md:h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2023/01/27/06/17/pixel-7746506_1280.jpg')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {processText(pageContent?.hero?.title || 'Media')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl md:max-w-4xl leading-relaxed text-white overflow-hidden whitespace-pre-line"
          >
            {processText(pageContent?.hero?.description || '').split('\n').map((line, index) => (
              <span key={index} className="block mb-2">{line}</span>
            ))}
          </motion.p>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            {processText(pageContent?.media?.title || 'Latest Press Releases')}
          </h2>
          <div className="space-y-8 sm:space-y-12">
            {(pageContent?.media?.releases || []).map((release, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={release.image || '/images/placeholder.jpg'}
                  alt={release.title || 'Press Release'}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">{processText(release.title || 'Untitled Release')}</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {release.date || 'Unknown Date'}
                  </p>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {processText(release.content || 'No content available.').split('\n').map((line, index) => (
                      <span key={index} className="block mb-2">{line}</span>
                    ))}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{processText(pageContent?.cta?.title || 'Stay Updated')}</h2>
            <p className="text-base sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
              {processText(pageContent?.cta?.description || '')}
            </p>
            <a
              href="/signup"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              {processText(pageContent?.cta?.linkText || 'Subscribe Now')}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Media;