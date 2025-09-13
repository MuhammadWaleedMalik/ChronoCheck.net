import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Users, Video, Star } from 'react-feather';
import { websiteInfo } from '../../data/website/info';
import { useLanguage } from '../../contexts/LanguageContext';
import { colors } from '../../data/colors/theme';
// Import language files
import enAthleteQA from '../data/text/en/athleteQA.json';
import zhAthleteQA from '../data/text/zh/athleteQA.json';
import jaAthleteQA from '../data/text/ja/athleteQA.json';
import esAthleteQA from '../data/text/es/athleteQA.json';

const languageMap = {
  en: enAthleteQA,
  zh: zhAthleteQA,
  ja: jaAthleteQA,
  es: esAthleteQA,
};

interface AthleteQAContent {
  hero: {
    title: string;
    subtitle: string;
  };
  becomeAthlete: {
    title: string;
    description: string;
    form: {
      title: string;
      subtitle: string;
      fields: {
        name: string;
        email: string;
        question: string;
        submit: string;
      };
    };
    steps: {
      id: number;
      title: string;
      description: string;
      icon: string;
    }[];
  };
  faq: {
    title: string;
    items: {
      id: number;
      question: string;
      answer: string;
      icon: string;
    }[];
  };
}

const AthleteQA: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Question submitted:', formData);
    // Here you would typically send the form data to an API
    setFormData({ name: '', email: '', question: '' });
  };

  const processText = (text: string) => {
    return text
      .replace(/\{website\.name\}/g, websiteInfo?.name || 'Hudl')
      .replace(/\{primaryColor1\}/g, colors.primaryColor1);
  };

  const iconComponents: Record<string, React.ReactNode> = {
    help: <HelpCircle size={24} />,
    users: <Users size={24} />,
    video: <Video size={24} />,
    star: <Star size={24} />,
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

      {/* Become an Athlete Section with Form */}
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
              <HelpCircle size={40} color={colors.primaryColor1} />
            </div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primaryColor1 }}>
              {processText(pageContent.becomeAthlete.title)}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              {processText(pageContent.becomeAthlete.description)}
            </p>
            {/* Question Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-8 shadow-md max-w-2xl mx-auto mb-12"
            >
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primaryColor1 }}>
                {processText(pageContent.becomeAthlete.form.title)}
              </h3>
              <p className="text-gray-600 mb-6">{processText(pageContent.becomeAthlete.form.subtitle)}</p>
              <div
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    {processText(pageContent.becomeAthlete.form.fields.name)}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1, focusRingColor: colors.primaryColor1 }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    {processText(pageContent.becomeAthlete.form.fields.email)}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1, focusRingColor: colors.primaryColor1 }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="question">
                    {processText(pageContent.becomeAthlete.form.fields.question)}
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primaryColor1, focusRingColor: colors.primaryColor1 }}
                    rows={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-3 rounded-lg text-white font-bold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primaryColor1 }}
                  onClick={handleSubmit}
                >
                  {processText(pageContent.becomeAthlete.form.fields.submit)}
                </button>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pageContent.becomeAthlete.steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${colors.primaryColor1}20` }}
                    >
                      {iconComponents[step.icon] || <HelpCircle size={24} color={colors.primaryColor1} />}
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: colors.primaryColor1 }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {processText(step.description)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
            style={{ color: colors.primaryColor1 }}
          >
            {processText(pageContent.faq.title)}
          </motion.h2>
          <div className="space-y-6">
            {pageContent.faq.items.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: `${colors.primaryColor1}20` }}
                  >
                    {iconComponents[faq.icon] || <HelpCircle size={24} color={colors.primaryColor1} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: colors.primaryColor1 }}>
                      {processText(faq.question)}
                    </h3>
                    <p className="text-gray-600">
                      {processText(faq.answer)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AthleteQA;