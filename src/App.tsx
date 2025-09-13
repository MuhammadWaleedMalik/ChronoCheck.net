import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Privacy from './pages/Privacy';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Cookies from './pages/Cookies';
import Terms from './pages/Terms';

import FAQs from './pages/Faqs';


import Accessanduse from './pages/Accessanduse';
import Team from './pages/Teams';

import Donate from './pages/Donate';
import Make2D from './pages/Features/Make2D';
import Make3D from './pages/Features/Make3D';
import CodeOptimizer2D from './pages/Features/CodeOptimizer2D';
import CodeOptimizer3D from './pages/Features/CodeOptimizer3D';
import GamePosterGenerator from './pages/Features/GamePosterGenerator';
import Services from './pages/Services';
import Media from './pages/Media';




function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                
                <Route path="/blogs" element={<Blog />} />
                <Route path="/media" element={<Media />} />
                <Route path="/doante" element={<Donate />} />
             
                <Route path="/preservation" element={<Privacy />} />

                <Route path="/access-/-use" element={<Accessanduse />} />
                
                
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/contactus" element={<Contact />} />
                <Route path="/contact" element={<Contact />} />
             
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/teammembers" element={<Team />} />
               
                <Route path="/services" element={<Services />} />
             
                <Route path="/2dgames" element={<Make2D />} />
                <Route path="/3dgames" element={<Make3D />} />
                <Route path="/refine2dgames" element={<CodeOptimizer2D />} />
                <Route path="/refine3dgames" element={<CodeOptimizer3D />} />
                <Route path="/gamecovers" element={<GamePosterGenerator />} />
               
               
             
               
                {/* <Route path="/teams" element={ <ProtectedRoute> <JoinTeams/> </ProtectedRoute>} /> */}

    
    




            
                

                </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;