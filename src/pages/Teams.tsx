
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { websiteInfo } from '../data/website/info';

// Import language files
import enTeam from '../data/text/en/team.json';
import zhTeam from '../data/text/zh/team.json';
import jaTeam from '../data/text/ja/team.json';
import esTeam from '../data/text/es/team.json';

const languageMap = {
  en: enTeam,
  zh: zhTeam,
  ja: jaTeam,
  es: esTeam,
};

const Team = () => {
  const { currentLanguage } = useLanguage();
  const pageContent = languageMap[currentLanguage?.code] || languageMap.en;

  const processText = (text) => {
    if (typeof text !== 'string' || text == null) {
      console.warn('processText received invalid text:', text);
      return text || '';
    }
    return text.replace(/\{website\.name\}/g, websiteInfo.name);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{processText(pageContent?.team?.title || 'Our Team')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 sm:gap-12">
            {(pageContent?.team?.members || []).map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-4 sm:p-6 bg-gray-900 rounded-lg shadow-md"
              >
                <img
                  src={member.image || '/images/placeholder.jpg'}
                  alt={member.name || 'Team Member'}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg sm:text-xl font-semibold">{processText(member.name || 'Unnamed Member')}</h3>
                <p className="text-gray-400 mb-2">{processText(member.title || 'Unknown Role')}</p>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{processText(member.bio || 'No bio available.')}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;

