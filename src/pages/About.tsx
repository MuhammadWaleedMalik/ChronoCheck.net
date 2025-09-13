import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { websiteInfo } from '../data/website/info';
import { Link } from 'react-router-dom';

// Import language files
import enAbout from '../data/text/en/about.json';
import zhAbout from '../data/text/zh/about.json';
import jaAbout from '../data/text/ja/about.json';
import esAbout from '../data/text/es/about.json';

const languageMap = {
  en: enAbout,
  zh: zhAbout,
  ja: jaAbout,
  es: esAbout,
} as const;

type LanguageCode = keyof typeof languageMap;

const AboutUs = () => {
  const { currentLanguage } = useLanguage();
  const langCode = (currentLanguage?.code as LanguageCode) || 'en';
  const pageContent = languageMap[langCode];

  const processText = (text: string) => {
    return text.replace(/\{website\.name\}/g, websiteInfo.name);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with Background Image */}
      <section
        className="relative w-full h-80 sm:h-96 md:h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('https://cdn.prod.website-files.com/5e5fd23006075b7087ffe4f8/67545b287ef76091a2a9aefa_hero2.avif')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {processText(pageContent.hero.title)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl md:max-w-4xl leading-relaxed text-white overflow-hidden whitespace-pre-line"
          >
            {processText(pageContent.hero.description).split('\n').map((line, index) => (
              <span key={index} className="block mb-2">{line}</span>
            ))}
          </motion.p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 sm:gap-12">
            {pageContent.team.members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-4 sm:p-6 bg-gray-900 rounded-lg shadow-md"
              >
                <img
                  src={member.image}
                  alt={`${member.name} Photo`}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg sm:text-xl font-semibold">{processText(member.name)}</h3>
                <p className="text-gray-400 mb-2">{processText(member.title)}</p>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{processText(member.bio)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section with Alternating Image-Text */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          {pageContent.values.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 sm:gap-8 mb-10 sm:mb-12`}
            >
              <div className="w-full h-full md:w-1/2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full sm:h-56 md:h-64 object-contain rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2 p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">{processText(item.title)}</h3>
                <p className="text-sm sm:text-base md:text-gray-300 leading-relaxed overflow-hidden">{processText(item.description)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Text Divs */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            {pageContent.additional.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900 p-4 sm:p-6 rounded-lg border border-gray-700 shadow-md"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">{processText(item.title)}</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed overflow-hidden">{processText(item.description)}</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{processText(pageContent.cta.title)}</h2>
            <p className="text-base sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">{processText(pageContent.cta.description)}</p>
            <Link
              to="/signup"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              {processText(pageContent.cta.linkText)}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;