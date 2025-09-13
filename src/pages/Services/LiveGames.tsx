import React from 'react';
import { motion } from 'framer-motion';
import { websiteInfo } from '../../data/website/info';
import { useLanguage } from '../../contexts/LanguageContext';
import { colors } from '../../data/colors/theme';
// Import language files
import enLiveGames from '../data/text/en/liveGames.json';
import zhLiveGames from '../data/text/zh/liveGames.json';
import jaLiveGames from '../data/text/ja/liveGames.json';
import esLiveGames from '../data/text/es/liveGames.json';

const languageMap = {
  en: enLiveGames,
  zh: zhLiveGames,
  ja: jaLiveGames,
  es: esLiveGames,
};

interface LiveGamesContent {
  hero: {
    title: string;
    subtitle: string;
  };
  games: {
    title: string;
    items: {
      id: number;
      title: string;
      description: string;
      image?: string;
    }[];
  };
}

const LiveGames: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en;

  const processText = (text: string) => {
    return text
      .replace(/\{website\.name\}/g, websiteInfo?.name || 'Hudl')
      .replace(/\{primaryColor1\}/g, colors.primaryColor1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center py-32 px-6 min-h-[70vh]"
        style={{ backgroundColor: colors.primaryColor1 }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {processText(pageContent.hero.title)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
          >
            {processText(pageContent.hero.subtitle)}
          </motion.p>
        </div>
      </section>

      {/* Live Games List Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
      
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            </div>
        </div>
      </section>
    </div>
  );
};

export default LiveGames;