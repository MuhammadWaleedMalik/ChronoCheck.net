import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Heart } from 'react-feather';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

// Import language files for donate page
import enDonate from '../data/text/en/donate.json';
import zhDonate from '../data/text/zh/donate.json';
import jaDonate from '../data/text/ja/donate.json';
import esDonate from '../data/text/es/donate.json';

const languageMap = {
  en: enDonate,
  zh: zhDonate,
  ja: jaDonate,
  es: esDonate,
};

interface DonateContent {
  hero: {
    title: string;
    subtitle: string;
  };
  donation: {
    title: string;
    description: string;
  };
  form: {
    title: string;
    fields: {
      name: string;
      email: string;
      amount: string;
      paymentMethod: string;
      submit: string;
    };
  };
  cta: {
    title: string;
    subtitle: string;
  };
}

const Donate: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    paymentMethod: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Handle form submission logic (e.g., send data to an API)
    console.log('Donation submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', amount: '', paymentMethod: '' });
  };

  const processText = (text: string) => {
    return text.replace(/\{website\.name\}/g, websiteInfo?.name || 'GameForge Studio');
  };

  const iconComponents: Record<string, React.ReactNode> = {
    dollar: <DollarSign size={24} className="text-blue-400" />,
    users: <Users size={24} className="text-purple-400" />,
    heart: <Heart size={24} className="text-red-400" />,
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
            <span className="text-white text-sm font-medium uppercase tracking-wider">Support Our Mission</span>
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
              to="#donate-form"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Donate Now
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

      {/* Donation Info Section */}
      <section className="relative py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-gray-900 border border-gray-700">
              <Heart size={32} className="text-red-400" />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white">
              {processText(pageContent.donation.title)}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {processText(pageContent.donation.description)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="relative py-20 px-6 bg-gray-800" id="donate-form">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              {processText(pageContent.form.title)}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Fill out the form below to make a donation
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-8 border border-gray-700 max-w-lg mx-auto"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="name">
                  {processText(pageContent.form.fields.name)}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="email">
                  {processText(pageContent.form.fields.email)}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="amount">
                  {processText(pageContent.form.fields.amount)}
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter donation amount"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="paymentMethod">
                  {processText(pageContent.form.fields.paymentMethod)}
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled>Select payment method</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="crypto">Cryptocurrency</option>
                </select>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
              >
                {processText(pageContent.form.fields.submit)}
              </button>
            </div>
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

export default Donate;