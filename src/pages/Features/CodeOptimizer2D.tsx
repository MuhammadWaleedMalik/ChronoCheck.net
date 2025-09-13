import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, RefreshCw, Copy, Zap, CheckCircle } from 'react-feather';

const CodeOptimizer2D = () => {
  const [inputCode, setInputCode] = useState('');
  const [optimizedCode, setOptimizedCode] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [copied, setCopied] = useState(false);

  const optimizeCode = () => {
    if (!inputCode.trim()) return;
    
    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      const optimized = optimizeCodeLogic(inputCode);
      setOptimizedCode(optimized);
      setIsOptimizing(false);
    }, 1500);
  };

  const optimizeCodeLogic = (code) => {
    // This is a simplified example - in a real app, this would use more advanced techniques
    
    // Example optimizations:
    let optimized = code;
    
    // 1. Remove console logs for production
    optimized = optimized.replace(/console\.log\(.*\);?/g, '');
    
    // 2. Suggest requestAnimationFrame for game loops
    if (optimized.includes('setInterval(') && optimized.includes('draw')) {
      optimized = optimized.replace(
        /setInterval\(draw, \d+\);/, 
        '// Using requestAnimationFrame for smoother animation\n    requestAnimationFrame(draw);'
      );
    }
    
    // 3. Optimize variable declarations
    optimized = optimized.replace(/var\s+/g, 'let ');
    
    // 4. Add performance suggestions as comments
    if (optimized.includes('createImage(')) {
      optimized += '\n\n// Consider reusing image objects instead of creating them in the draw loop';
    }
    
    // 5. Add error handling suggestions
    if (!optimized.includes('try {')) {
      optimized = '// Added error handling for better debugging\ntry {\n' + optimized + '\n} catch (e) {\n    console.error("Game error:", e);\n}';
    }
    
    return optimized;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(optimizedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exampleCode = `// Basic platformer game
let playerX = 100;
let playerY = 300;
let playerSpeed = 5;
let gravity = 0.5;
let velocity = 0;
let isJumping = false;
let platforms = [{x: 0, y: 350, width: 400, height: 20}];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(135, 206, 235);
  
  // Apply gravity
  velocity += gravity;
  playerY += velocity;
  
  // Check platform collisions
  for (let i = 0; i < platforms.length; i++) {
    let p = platforms[i];
    rect(p.x, p.y, p.width, p.height);
    
    if (playerX > p.x && playerX < p.x + p.width && 
        playerY > p.y && playerY < p.y + p.height) {
      playerY = p.y;
      velocity = 0;
      isJumping = false;
    }
  }
  
  // Draw player
  fill(255, 0, 0);
  rect(playerX, playerY, 30, 30);
  
  // Move player
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= playerSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerX += playerSpeed;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && !isJumping) {
    velocity = -12;
    isJumping = true;
  }
}`;

  const loadExample = () => {
    setInputCode(exampleCode);
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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            2D Game Code Optimizer
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Paste your 2D game code and we'll help optimize it for better performance and readability.
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
                <Code className="mr-2 text-blue-400" />
                Your Game Code
              </h2>
              <button
                onClick={loadExample}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Load Example
              </button>
            </div>

            <textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Paste your 2D game code here..."
              className="w-full h-96 bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={optimizeCode}
                disabled={isOptimizing || !inputCode.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                {isOptimizing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Zap size={18} className="mr-2" />
                    Optimize Code
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
                <RefreshCw className="mr-2 text-green-400" />
                Optimized Code
              </h2>
              <button
                onClick={copyToClipboard}
                disabled={!optimizedCode}
                className="p-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors flex items-center"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle size={18} className="text-green-400" /> : <Copy size={18} />}
              </button>
            </div>

            {optimizedCode ? (
              <div className="bg-gray-900 rounded-lg p-4 overflow-auto h-96">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                  {optimizedCode}
                </pre>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-8 text-center h-96 flex items-center justify-center">
                <div>
                  <div className="text-gray-500 mb-4">
                    <RefreshCw size={48} className="mx-auto" />
                  </div>
                  <p className="text-gray-400">
                    {isOptimizing 
                      ? 'Optimizing your code...' 
                      : 'Your optimized code will appear here'}
                  </p>
                </div>
              </div>
            )}

            {optimizedCode && (
              <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                <h3 className="font-bold text-blue-400 mb-2">
                  Optimization Notes
                </h3>
                <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                  <li>Removed console logs for production</li>
                  <li>Optimized variable declarations</li>
                  <li>Added error handling structure</li>
                  <li>Added performance suggestions as comments</li>
                </ul>
              </div>
            )}
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">2D Game Optimization Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-blue-400">Performance</h3>
              <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                <li>Use requestAnimationFrame instead of setInterval for game loops</li>
                <li>Avoid creating objects in render/draw functions</li>
                <li>Reuse objects when possible instead of creating new ones</li>
                <li>Use object pooling for frequently created/destroyed entities</li>
              </ul>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-blue-400">Code Structure</h3>
              <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                <li>Separate game logic from rendering code</li>
                <li>Use classes for game entities with clear responsibilities</li>
                <li>Implement a simple game state management system</li>
                <li>Use constants for magic numbers</li>
              </ul>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-blue-400">Memory Management</h3>
              <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                <li>Clean up unused objects and event listeners</li>
                <li>Preload assets to avoid lag during gameplay</li>
                <li>Use atlases for textures instead of individual images</li>
                <li>Implement level streaming for large games</li>
              </ul>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-blue-400">Rendering</h3>
              <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                <li>Use canvas layers for static vs dynamic elements</li>
                <li>Implement viewport culling to avoid drawing off-screen objects</li>
                <li>Batch similar drawing operations together</li>
                <li>Use transform operations instead of redrawing at new positions</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default CodeOptimizer2D;