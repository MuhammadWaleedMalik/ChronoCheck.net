import React from 'react';
import { motion } from 'framer-motion';
import { Video, BarChart2, Users, Globe, Share2, Camera, DollarSign, Smartphone, Link, Headphones } from 'react-feather';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';
import { colors } from '../data/colors/theme';
// Import language files
import enFaqs from '../data/text/en/faqs.json';
import zhFaqs from '../data/text/zh/faqs.json';
import jaFaqs from '../data/text/ja/faqs.json';
import esFaqs from '../data/text/es/faqs.json';
const languageMap = {
  en: enFaqs,
  zh: zhFaqs,
  ja: jaFaqs,
  es: esFaqs,
};
interface FaqsContent {
  hero: {
    title: string;
    subtitle: string;
  };
  mission: {
    title: string;
    description: string;
  };
  features: {
    title: string;
    items: {
      id: number;
      title: string;
      description: string;
      icon: string;
    }[];
  };
  team: {
    title: string;
    description: string;
  };
  stats: {
    title: string;
    items: {
      value: string;
      label: string;
    }[];
  };
}
const Faqs: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en;
  const processText = (text: string) => {
    return text
      .replace(/\{website\.name\}/g, websiteInfo?.name || 'Hudl')
      .replace(/\{primaryColor1\}/g, colors.primaryColor1);
  };
  const iconComponents: Record<string, React.ReactNode> = {
    video: <Video size={24} />,
    stats: <BarChart2 size={24} />,
    users: <Users size={24} />,
    globe: <Globe size={24} />,
    share: <Share2 size={24} />,
    camera: <Camera size={24} />,
    dollar: <DollarSign size={24} />,
    smartphone: <Smartphone size={24} />,
    link: <Link size={24} />,
    headphones: <Headphones size={24} />
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center py-32 px-6 min-h-[70vh]"
        style={{ backgroundColor: colors.primaryColor1 }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
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
      {/* Mission Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Globe size={40} color={colors.primaryColor1} />
            </div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primaryColor1 }}>
              {processText(pageContent.mission.title)}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {processText(pageContent.mission.description)}
            </p>
          </motion.div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 px-6" style={{ backgroundColor: colors.secondaryColor2 }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-white mb-12"
          >
            {processText(pageContent.stats.title)}
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {pageContent.stats.items.map((stat, index) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-white/90">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section - Updated to vertical list for better FAQ UI */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
            style={{ color: colors.primaryColor1 }}
          >
            {processText(pageContent.features.title)}
          </motion.h2>
          <div className="grid grid-cols-1 gap-6">
            {pageContent.features.items.map((feature, index) => (
              <motion.details
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <summary className="flex items-center justify-between text-xl font-bold mb-3" style={{ color: colors.primaryColor1 }}>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full mr-4"
                         style={{ backgroundColor: `${colors.primaryColor1}20` }}>
                      {iconComponents[feature.icon] || <Video size={24} color={colors.primaryColor1} />}
                    </div>
                    {feature.title}
                  </div>
                  <span className="text-gray-400">+</span>
                </summary>
                <p className="text-gray-600 pl-14">
                  {processText(feature.description)}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Users size={40} color={colors.primaryColor1} />
            </div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primaryColor1 }}>
              {processText(pageContent.team.title)}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {processText(pageContent.team.description)}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default Faqs;