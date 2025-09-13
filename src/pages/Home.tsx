import React, { useMemo, Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { websiteInfo } from '../data/website/info';
import { colors } from '../data/colors/theme';

const LazyImage = lazy(() => import('../components/LazyImage'));

// Import language files
import enHome from '../data/text/en/home.json';
import zhHome from '../data/text/zh/home.json';
import jaHome from '../data/text/ja/home.json';
import esHome from '../data/text/es/home.json';

const languageMap = {
  en: enHome,
  zh: zhHome,
  ja: jaHome,
  es: esHome,
};

// Define types for better type safety
type CardItem = {
  title?: string;
  description?: string;
  link?: string;
  image?: string;
};

type TestimonialItem = {
  name?: string;
  role?: string;
  quote?: string;
};

type StatItem = {
  number?: string;
  label?: string;
};

interface HomeContent {
  hero?: {
    title?: string;
    subtitle?: string;
    cta?: string;
  };
  stats?: {
    title?: string;
    stats?: StatItem[];
    brandsText?: string;
  };
  features?: {
    title?: string;
    subtitle?: string;
    listItems?: string[];
    ctaPrimary?: string;
    ctaSecondary?: string;
  };
  about?: {
    title?: string;
    subtitle?: string;
    description?: string;
  };
  blogs?: {
    title?: string;
    cards?: CardItem[];
  };
  ctaSection?: {
    title?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  testimonials?: {
    title?: string;
    items?: TestimonialItem[];
  };
  contact?: {
    title?: string;
    description?: string;
    formTitle?: string;
  };
}

const processText = (text?: string): string => {
  if (!text) return '';
  return text
    .replace(/\{website\.name\}/g, websiteInfo?.name || '')
    .replace(/\{website\.slogan\}/g, websiteInfo?.slogan || '')
    .replace(/\{primaryColor1\}/g, colors.primaryColor1 || '')
    .replace(/\{primaryColor3\}/g, colors.primaryColor3 || '');
};

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const defaultContent = languageMap.en as HomeContent;
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const pageContent = useMemo(() => {
    return languageMap[currentLanguage?.code as keyof typeof languageMap] || defaultContent;
  }, [currentLanguage?.code]);

  const processedContent = useMemo(() => {
    return {
      hero: {
        title: processText(pageContent.hero?.title),
        subtitle: processText(pageContent.hero?.subtitle),
        cta: processText(pageContent.hero?.cta),
      },
      stats: {
        title: processText(pageContent.stats?.title),
        stats: pageContent.stats?.stats || [],
        brandsText: processText(pageContent.stats?.brandsText),
      },
      features: {
        title: processText(pageContent.features?.title),
        subtitle: processText(pageContent.features?.subtitle),
        listItems: pageContent.features?.listItems || [],
        ctaPrimary: processText(pageContent.features?.ctaPrimary),
        ctaSecondary: processText(pageContent.features?.ctaSecondary),
      },
      about: {
        title: processText(pageContent.about?.title),
        subtitle: processText(pageContent.about?.subtitle),
        description: processText(pageContent.about?.description),
      },
      blogs: {
        title: processText(pageContent.blogs?.title),
        cards: pageContent.blogs?.cards || [],
      },
      ctaSection: {
        title: processText(pageContent.ctaSection?.title),
        ctaText: processText(pageContent.ctaSection?.ctaText),
        ctaLink: processText(pageContent.ctaSection?.ctaLink),
      },
      testimonials: {
        title: processText(pageContent.testimonials?.title),
        items: pageContent.testimonials?.items || [],
      },
      contact: {
        title: processText(pageContent.contact?.title),
        description: processText(pageContent.contact?.description),
        formTitle: processText(pageContent.contact?.formTitle),
      }
    };
  }, [pageContent]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (processedContent.testimonials.items.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => 
          (prev + 1) % processedContent.testimonials.items.length
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [processedContent.testimonials.items.length]);

  // Media assets
  const mediaAssets = {
    heroImage: 'https://www.thewatchregister.com/wp-content/themes/thewatchregister_theme/media/imagery/Watch_Parade@2x.webp',
    aboutImage: 'https://twr-web.s3.amazonaws.com/uploads/2023/04/Open_Safe.svg',
    blogImages: [
        'https://www.thewatchregister.com/wp-content/themes/thewatchregister_theme/media/ui_elements/dealers-icon.svg',
        'https://www.thewatchregister.com/wp-content/themes/thewatchregister_theme/media/ui_elements/pawnbrokers-icon.svg',
        'https://www.thewatchregister.com/wp-content/themes/thewatchregister_theme/media/ui_elements/auction_houses-icon.svg',
        'https://www.thewatchregister.com/wp-content/themes/thewatchregister_theme/media/ui_elements/private_individuals-icon.svg',
        'https://www.thewatchregister.com/wp-content/themes/thewatchregister_theme/media/ui_elements/insurers-icon.svg',
        'https://www.thewatchregister.com/wp-content/themes/thewatchregister_theme/media/ui_elements/law_enforcement-icon.svg',

    ],
    ctaBackground: 'https://twr-web.s3.amazonaws.com/uploads/2023/05/Watch-in-shop_nvy-cpygry.jpg',
    brandLogos: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kYZgtrZD63__Eyf9eeMg_V98YcqoxhVtyA&s',  
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDa1fpN1uAClCdJddSleS2eGpGgytUjEmGlQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTJ7q2KydARGuXCirKkq75uwjrUydyJN6IA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEEcKVFv_Sq0ZmnvmMlQFr1m3gJH5L4F02Ow&s',
      'https://img.freepik.com/premium-vector/watch-logo-design-casual-style-black-white-monochrome_1108897-1.jpg?semt=ais_hybrid&w=740&q=80',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1XCIqaQ9NS8JCOND9POGvpV4-HitFiG_leg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6fyB1hRYsbQ7bqRkGgdk_SwPxSqoOWKATTg&s',

    ]
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" , fontFamily : 'TimesNewRoman' }}>
      {/* Page 1 - Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative  flex items-center justify-center min-h-screen py-20 px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ color: colors.textPrimary }}
            >
              {processedContent.hero.title}
            </motion.h1>
            <div className='w-full h-[2px] bg-yellow-600'></div>
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-3xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ color: colors.textSecondary }}
            >
              {processedContent.hero.subtitle}
            </motion.p>
            <div className='w-full h-[2px] bg-yellow-600'></div>

           
            </div>
          
          {/* Right Column - Image */}
          <motion.div 
            className="rounded-xl overflow-hidden shadow-2xl"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Suspense fallback={
              <div className="w-full h-full bg-gray-300 animate-pulse" />
            }>
              <img 
                src={mediaAssets.heroImage}
                alt="Hero image"
                className="w-full h-full object-contain"
              />
            </Suspense>
          </motion.div>
        </div>
      </motion.section>

      {/* Page 2 - Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8"
        style={{ backgroundColor: "#E1EBEE" }}
      >
        <div className="max-w-7xl mx-auto">
      
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {processedContent.stats.stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl md:text-6xl font-bold mb-4" style={{ color: "#1F305B" }}>
                  {stat.number}
                </div>
                <div className="text-xl" style={{ color: colors.textSecondary }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
          
          <p className="text-center text-xl mb-8" style={{ color: colors.textSecondary }}>
            {processedContent.stats.brandsText}
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12">
            {mediaAssets.brandLogos.map((logo, index) => (
              <motion.div 
                key={index}
                className="h-16 w-16 md:h-20 md:w-20 grayscale contrast-200 opacity-80"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Suspense fallback={<div className="w-full h-full bg-gray-300 animate-pulse rounded" />}>
                  <LazyImage 
                    src={logo}
                    alt={`Brand logo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </Suspense>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Page 3 - Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8"
        style={{ backgroundColor: colors.primaryColor1 }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colors.textPrimary }}>
              {processedContent.features.title}
            </h2>
            <p className="text-xl mb-8" style={{ color: colors.textSecondary }}>
              {processedContent.features.subtitle}
            </p>
            
            <ul className="space-y-4 mb-8">
              {processedContent.features.listItems.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <svg className="w-6 h-6 mr-3 mt-1 bg-black  flex-shrink-0" style={{ color: colors.primaryColor3 }} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span style={{ color: colors.textSecondary }}>{item}</span>
                </li>
              ))}
            </ul>
            
          </div>
          
          {/* Right Column - Placeholder for illustration or additional content */}
          <div className="flex  sm:flex-col p-10  gap-4" 
                style={{ backgroundColor : "#4996EE"}}
          >
              <h1 className='text-white text-5xl '>SignUp</h1>      
              <Link
                to="/signup"
                className="px-8 py-3 font-semibold rounded-lg text-center transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: colors.primaryColor1, 
                  color: "lightblue"
                }}
              >
                {processedContent.features.ctaPrimary}
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 font-semibold rounded-lg text-center border transition-all duration-300 transform hover:scale-105"
                style={{ 
                  borderColor: colors.primaryColor1,
                  color: colors.primaryColor1
                }}
              >
                {processedContent.features.ctaSecondary}
              </Link>
            </div>
        
   
        </div>
      </motion.section>

      {/* Page 4 - About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8"
        style={{ 
          backgroundColor: "#1F305B", 
          color : 'white'
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <Suspense fallback={
              <div className="w-full h-96 bg-gray-300 animate-pulse" />
            }>
              <LazyImage 
                src={mediaAssets.aboutImage}
                alt="About image"
                className="w-full h-full"
              />
            </Suspense>
          </div>
          
          {/* Right Column - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" >
              {processedContent.about.title}
            </h2>
            <div className='w-full h-[2px] bg-yellow-600'></div>
            <p className="text-xl mb-4" >
              {processedContent.about.subtitle}
            </p>
            <div className='w-full h-[2px] bg-yellow-600'></div>
            <p className="text-lg" >
              {processedContent.about.description}
            </p>
          </div>
        </div>
      </motion.section>

   
      {/* Page 5 - Blogs Section */}
      <motion.section 
        className='bg-white py-20 px-6 lg:px-8'
      >

          <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="py-20 px-16 lg:px-8"
              style={{ backgroundColor: "#E1EBEE" }}
            >
              <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-12 text-left" style={{ color: colors.textPrimary }}>
                  {processedContent.blogs.title}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                  {processedContent.blogs.cards.map((card, index) => (
                    <motion.div 
                      key={index}
                      className="rounded-xl overflow-hidden "
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8 }}
                      style={{ backgroundColor: "#E1EBEE" }}
                    >
                      <div className="aspect-video p-4 flex  overflow-hidden">
                        <Suspense fallback={
                          <div className="w-12 h-12  bg-gray-300 animate-pulse" />
                        }>
                          <LazyImage 
                            src={mediaAssets.blogImages[index] || mediaAssets.blogImages[0]}
                            alt={card.title || `Blog ${index + 1}`}
                            className="w-12 h-12 object-contain"
                          />
                        </Suspense>
                        <h3 className="text-xl font-bold " style={{ color: "#1F305B" }}>
                          {card.title}
                        </h3>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 ">
                          {card.description}
                        </p>
                 
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>


      </motion.section>


      {/* Page 6 - CTA Section with Background Image */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative py-32 px-6 lg:px-8 flex items-center justify-center"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Suspense fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
          }>
            <LazyImage
              src={mediaAssets.ctaBackground}
              className="absolute inset-0 object-cover w-full h-full"
              alt="CTA background"
            />
          </Suspense>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {processedContent.ctaSection.title}
          </h2>
          <Link
            to={"/signup"}
            className="inline-block px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            style={{ 
              backgroundColor: colors.primaryColor1, 
              color: "skyblue"
            }}
          >
            {processedContent.ctaSection.ctaText}
          </Link>
        </div>
      </motion.section>

   

     
    {/* Page 7 - Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8"
        style={{ backgroundColor: "white"  , fontFamily :"TimesNewRoman"}}
      >
        <div className="max-w-7xl mx-auto">
        
          
          <div className="relative min-h-[300px] md:min-h-[400px]  overflow-hidden">
            {processedContent.testimonials.items.map((testimonial, index) => (
              <motion.div
                key={index}
                className="absolute top-0 left-0 w-full h-full p-6 flex flex-col items-center justify-center text-center"
                initial={{ x: 300, opacity: 0 }}
                animate={{ 
                  x: index === currentTestimonial ? 0 : index < currentTestimonial ? -300 : 300,
                  opacity: index === currentTestimonial ? 1 : 0
                }}
                transition={{ duration: 0.5 }}
                style={{ display: index === currentTestimonial ? 'flex' : 'none' }}
              >
                <div className="max-w-3xl mx-auto">
                  <blockquote className="text-xl md:text-2xl lg:text-3xl   mb-8 leading-relaxed" style={{ color: colors.textSecondary }}>
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-6">
                    <p className="font-semibold text-lg md:text-xl" style={{ color: colors.textPrimary }}>
                      {testimonial.name}
                    </p>
                    <p className="text-sm md:text-base mt-1" style={{ color: colors.textSecondary }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            {processedContent.testimonials.items.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-2 transition-all duration-300 ${index === currentTestimonial ? 'bg-blue-500 scale-125' : 'bg-gray-300'}`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.section>

    {/* Page 8 - Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8"
        style={{ backgroundColor: colors.primaryColor1 ,fontFamily: 'TimesNewRoman' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - About */}
          <div>
            <h2 className="text-3xl md:text-6xl font-bold mb-6" style={{ color: colors.textPrimary }}>
              {processedContent.contact.title}
            </h2>
            <p className="text-lg" style={{ color: colors.textSecondary }}>
              {processedContent.contact.description}
            </p>
          </div>
          
          {/* Right Column - Sign p Form */}
          <div className="bg-blue-600 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6" style={{ color: colors.primaryColor1 }}>
              {processedContent.contact.formTitle}
            </h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: colors.primaryColor1 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: colors.primaryColor1 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: colors.primaryColor1 }}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create a password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 font-semibold rounded-lg transition-all duration-300"
                style={{ 
                  backgroundColor: colors.primaryColor1, 
                  color: "skyblue"
                }}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;