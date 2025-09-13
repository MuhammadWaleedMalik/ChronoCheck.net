import React from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Users, Zap } from 'react-feather';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

// Import language files for access and use page
import enAccess from '../data/text/en/access.json';
import zhAccess from '../data/text/zh/access.json';
import jaAccess from '../data/text/ja/access.json';
import esAccess from '../data/text/es/access.json';

const languageMap = {
  en: enAccess,
  zh: zhAccess,
  ja: jaAccess,
  es: esAccess,
};

interface AccessContent {
  hero: {
    title: string;
    subtitle: string;
  };
  access: {
    title: string;
    sections: {
      id: number;
      title: string;
      description: string;
      icon: string;
    }[];
  };
  usage: {
    title: string;
    description: string;
  };
  cta: {
    title: string;
    subtitle: string;
  };
}

const Accessanduse: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en;

  const processText = (text: string) => {
    return text.replace(/\{website\.name\}/g, websiteInfo?.name || 'GameForge Studio');
  };

  const iconComponents: Record<string, React.ReactNode> = {
    code: <Code size={24} className="text-blue-400" />,
    globe: <Globe size={24} className="text-red-400" />,
    users: <Users size={24} className="text-purple-400" />,
    zap: <Zap size={24} className="text-yellow-400" />,
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center py-24 px-6 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-gray-800 border border-gray-700"
          >
            <span className="text-white text-sm font-medium uppercase tracking-wider">Access & Use</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {processText(pageContent.hero.title)}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
          >
            {processText(pageContent.hero.subtitle)}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link
              to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Access Guidelines Section */}
      <section className="relative py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              {processText(pageContent.access.title)}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              How to access and make the most of our platform
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageContent.access.sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="flex items-center justify-center w-14 h-14 rounded-xl mb-4 bg-gray-900 group-hover:bg-blue-500/10 transition-colors">
                  {iconComponents[section.icon] || <Code size={24} />}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  {section.title}
                </h3>
                <p className="text-gray-400">
                  {processText(section.description)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Guidelines Section */}
      <section className="relative py-20 px-6 bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-gray-900 border border-gray-700">
              <Users size={32} className="text-blue-400" />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white">
              {processText(pageContent.usage.title)}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {processText(pageContent.usage.description)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {processText(pageContent.cta.title)}
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              {processText(pageContent.cta.subtitle)}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/signup"
                className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center"
              >
                Join Now
              </Link>
              <Link
                to="/contact"
                className="px-10 py-5 bg-transparent border-2 border-gray-700 text-white font-bold rounded-lg hover:border-blue-500 hover:text-blue-400 transition-all"
         >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Accessanduse;