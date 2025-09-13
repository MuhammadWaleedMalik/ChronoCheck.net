import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Play, Copy, Download, HelpCircle } from 'react-feather';

const Make2D = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateGameCode = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call with timeout
  
};

  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'game-code.js';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            2D Game Generator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Describe your game idea and we'll generate the code for you. Perfect for beginners and experienced developers alike.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                Describe Your Game
              </h2>
              <button 
                onClick={() => setShowInstructions(!showInstructions)}
                className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
              >
                <HelpCircle size={16} className="mr-1" />
                How to use
              </button>
            </div>

            <AnimatePresence>
              {showInstructions && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 bg-gray-700 p-4 rounded-lg"
                >
                  <h3 className="font-bold mb-2 text-blue-400">How to use this generator:</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>Describe your game idea in the text area (e.g., "a platform game with a character that jumps")</li>
                    <li>Click the Generate button to create your game code</li>
                    <li>Copy the code and use it in a p5.js environment</li>
                    <li>Customize the code to fit your exact needs</li>
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your 2D game idea... (e.g., a platformer game with jumping character, a space shooter with enemies, a puzzle game with blocks)"
              className="w-full h-40 bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                {prompt.length > 0 ? `${prompt.length} characters` : 'Enter your game idea'}
              </div>
              <button
                onClick={generateGameCode}
                disabled={isGenerating || !prompt.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Code
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Code className="mr-2 text-green-400" />
                Generated Code
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!generatedCode}
                  className="p-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy size={18} />
                </button>
                <button
                  onClick={downloadCode}
                  disabled={!generatedCode}
                  className="p-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                  title="Download code"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>

            {copied && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-2 bg-green-900/30 text-green-400 rounded-lg text-sm text-center"
              >
                Code copied to clipboard!
              </motion.div>
            )}

            {generatedCode ? (
              <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                  {generatedCode}
                </pre>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-8 text-center">
                <div className="text-gray-500 mb-4">
                  <Code size={48} className="mx-auto" />
                </div>
                <p className="text-gray-400">
                  {isGenerating 
                    ? 'Generating your game code...' 
                    : 'Your generated code will appear here'}
                </p>
              </div>
            )}

            {generatedCode && (
              <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                <h3 className="font-bold text-blue-400 mb-2 flex items-center">
                  <HelpCircle size={16} className="mr-2" />
                  How to use this code
                </h3>
                <p className="text-sm text-gray-300">
                  This code uses the p5.js library. To run it:
                </p>
                <ol className="list-decimal pl-5 mt-2 text-sm text-gray-400">
                  <li>Create an HTML file and include p5.js</li>
                  <li>Copy this code into a script tag or separate JS file</li>
                  <li>Open the HTML file in a web browser</li>
                </ol>
              </div>
            )}
          </motion.div>
        </div>

        {/* How to Use Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">How to Use Your Generated Code</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-blue-400 mb-2 text-2xl font-bold">1</div>
              <h3 className="font-bold mb-2">Create HTML File</h3>
              <p className="text-sm text-gray-400">
                Create a basic HTML file and include the p5.js library from a CDN or local installation.
              </p>
              <div className="mt-4 bg-gray-800 p-3 rounded text-xs font-mono overflow-x-auto">
                {`<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>`}
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-blue-400 mb-2 text-2xl font-bold">2</div>
              <h3 className="font-bold mb-2">Add Your Game Code</h3>
              <p className="text-sm text-gray-400">
                Copy the generated code into a &lt;script&gt; tag in your HTML file or link to it as an external JS file.
              </p>
              <div className="mt-4 bg-gray-800 p-3 rounded text-xs font-mono overflow-x-auto">
                {`<script>
  // Your generated code goes here
</script>`}
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-blue-400 mb-2 text-2xl font-bold">3</div>
              <h3 className="font-bold mb-2">Run and Customize</h3>
              <p className="text-sm text-gray-400">
                Open the HTML file in a web browser to play your game. Modify the code to customize it further.
              </p>
              <div className="mt-4 bg-gray-800 p-3 rounded text-xs font-mono overflow-x-auto">
                {`// Experiment with changing values
// to create your perfect game!`}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Make2D;