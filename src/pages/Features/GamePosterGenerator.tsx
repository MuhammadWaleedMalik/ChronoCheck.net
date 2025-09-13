import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Image, Download, RefreshCw} from 'react-feather';

const GamePosterGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [posterData, setPosterData] = useState(null);
  const canvasRef = useRef(null);

  const generatePoster = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      createPosterImage();
      setIsGenerating(false);
    }, 1000);
  };

  const createPosterImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas size (aspect ratio for poster: 2:3)
    canvas.width = 600;
    canvas.height = 900;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a202c');
    gradient.addColorStop(1, '#2d3748');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add decorative elements
    drawDecorativeElements(ctx, canvas.width, canvas.height);
    
    // Title (using the prompt)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    
    // Wrap text if too long
    const words = prompt.split(' ');
    let line = '';
    let lines = [];
    const maxWidth = canvas.width - 80;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && i > 0) {
        lines.push(line);
        line = words[i] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    
    // Draw title lines
    const startY = canvas.height / 3;
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + (index * 40));
    });
    
    // Add "Coming Soon" text
    ctx.fillStyle = '#F56565';
    ctx.font = 'italic 28px sans-serif';
    ctx.fillText('COMING SOON', canvas.width / 2, startY + (lines.length * 40) + 40);
    
    // Add platform text
    ctx.fillStyle = '#A0AEC0';
    ctx.font = '18px sans-serif';
    ctx.fillText('Available on PC, Console and Mobile', canvas.width / 2, canvas.height - 100);
    
    // Add generated image URL to state
    setPosterData(canvas.toDataURL('image/png'));
  };

  const drawDecorativeElements = (ctx, width, height) => {
    // Draw some game-related decorative elements
    ctx.fillStyle = 'rgba(66, 153, 225, 0.1)';
    
    // Top left design
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(150, 0);
    ctx.lineTo(0, 150);
    ctx.fill();
    
    // Bottom right design
    ctx.beginPath();
    ctx.moveTo(width, height);
    ctx.lineTo(width - 150, height);
    ctx.lineTo(width, height - 150);
    ctx.fill();
    
    // Center circle
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 120, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const downloadPoster = () => {
    if (!posterData) return;
    
    const link = document.createElement('a');
    link.download = `game-poster-${prompt.substring(0, 15).replace(/\s+/g, '-')}.png`;
    link.href = posterData;
    link.click();
  };

  const clearPoster = () => {
    setPosterData(null);
    setPrompt('');
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Game Poster Generator
          </h1>
          <p className="text-gray-400">
            Describe your game and we'll create a poster for it.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-8">
          {/* Input Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold flex items-center mb-2">
                Describe Your Game
              </h2>
              <p className="text-gray-400 text-sm">
                Example: "Space adventure with aliens and planets"
              </p>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your game idea here..."
              className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearPoster}
                className="px-4 py-2 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center"
              >
                <RefreshCw size={18} className="mr-2" />
                Clear
              </button>
              <button
                onClick={generatePoster}
                disabled={isGenerating || !prompt.trim()}
                className="px-6 py-3 bg-blue-600 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center hover:bg-blue-700 transition-all"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Image size={18} className="mr-2" />
                    Generate Poster
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Image className="mr-2 text-green-400" />
                Your Game Poster
              </h2>
              <button
                onClick={downloadPoster}
                disabled={!posterData}
                className="px-4 py-2 bg-green-600 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center hover:bg-green-700 transition-all"
              >
                <Download size={18} className="mr-2" />
                Download
              </button>
            </div>

            <div className="flex justify-center items-center bg-gray-900 rounded-lg overflow-hidden min-h-96 relative">
              {posterData ? (
                <img 
                  src={posterData} 
                  alt="Generated game poster" 
                  className="max-h-96 object-contain"
                />
              ) : (
                <div className="text-center p-8">
                  <div className="text-gray-500 mb-4">
                    <Image size={48} className="mx-auto" />
                  </div>
                  <p className="text-gray-400">
                    {isGenerating 
                      ? 'Generating your poster...' 
                      : 'Your game poster will appear here'}
                  </p>
                </div>
              )}
            </div>

            {/* Hidden canvas for generating the image */}
            <canvas ref={canvasRef} className="hidden" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GamePosterGenerator;