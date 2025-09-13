import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Play, Copy, Download, HelpCircle } from 'react-feather';
import { useLanguage } from '../../contexts/LanguageContext';

// Import language files
import enMake3D from '../data/text/en/make3d.json';
import zhMake3D from '../data/text/zh/make3d.json';
import jaMake3D from '../data/text/ja/make3d.json';
import esMake3D from '../data/text/es/make3d.json';

const languageMap = {
  en: enMake3D,
  zh: zhMake3D,
  ja: jaMake3D,
  es: esMake3D,
};

interface Make3DContent {
  header: {
    title: string;
    description: string;
  };
  input: {
    title: string;
    howToUse: string;
    instructions: string[];
    placeholder: string;
    generateButton: string;
    generating: string;
    characterCount: string;
  };
  output: {
    title: string;
    copied: string;
    empty: string;
    generating: string;
    usageTitle: string;
    usageDescription: string;
    usageSteps: string[];
  };
  section: {
    title: string;
    steps: {
      title: string;
      description: string;
      code: string;
    }[];
  };
}

const Make3D: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const content = languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en;

  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateGameCode = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // This would be replaced with actual AI integration
      const code = generateCodeFromPrompt(prompt);
      setGeneratedCode(code);
      setIsGenerating(false);
    }, 2000);
  };

  const generateCodeFromPrompt = (prompt: string) => {
    // Generic 3D game template using Three.js, adaptable to any prompt
    return `// 3D Game based on: ${prompt}
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene, camera, renderer, player;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  // Add lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  // Create player object
  const playerGeometry = new THREE.SphereGeometry(1, 32, 32);
  const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  player = new THREE.Mesh(playerGeometry, playerMaterial);
  player.position.set(0, 0, 0);
  scene.add(player);

  // Add basic environment
  const groundGeometry = new THREE.PlaneGeometry(50, 50);
  const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = Math.PI / 2;
  ground.position.y = -2;
  scene.add(ground);

  camera.position.z = 10;

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  // Add your game logic here
  renderer.render(scene, camera);
}

window.addEventListener('keydown', (e) => {
  // Basic movement controls
  if (e.key === 'ArrowUp') player.position.z -= 0.2;
  if (e.key === 'ArrowDown') player.position.z += 0.2;
  if (e.key === 'ArrowLeft') player.position.x -= 0.2;
  if (e.key === 'ArrowRight') player.position.x += 0.2;
});

init();`;
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
            {content.header.title}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {content.header.description}
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
                {content.input.title}
              </h2>
              <button 
                onClick={() => setShowInstructions(!showInstructions)}
                className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
              >
                <HelpCircle size={16} className="mr-1" />
                {content.input.howToUse}
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
                  <h3 className="font-bold mb-2 text-blue-400">{content.input.howToUse}:</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    {content.input.instructions.map((instr, index) => (
                      <li key={index}>{instr}</li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={content.input.placeholder}
              className="w-full h-40 bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                {prompt.length > 0 ? `${prompt.length} ${content.input.characterCount}` : content.input.placeholder}
              </div>
              <button
                onClick={generateGameCode}
                disabled={isGenerating || !prompt.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {content.input.generating}
                  </>
                ) : (
                  <>
                    {content.input.generateButton}
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
                {content.output.title}
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
                {content.output.copied}
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
                    ? content.output.generating 
                    : content.output.empty}
                </p>
              </div>
            )}

            {generatedCode && (
              <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                <h3 className="font-bold text-blue-400 mb-2 flex items-center">
                  <HelpCircle size={16} className="mr-2" />
                  {content.output.usageTitle}
                </h3>
                <p className="text-sm text-gray-300">
                  {content.output.usageDescription}
                </p>
                <ol className="list-decimal pl-5 mt-2 text-sm text-gray-400">
                  {content.output.usageSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
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
          <h2 className="text-2xl font-bold mb-6 text-center">{content.section.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.section.steps.map((step, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <div className="text-blue-400 mb-2 text-2xl font-bold">{index + 1}</div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">
                  {step.description}
                </p>
                <div className="mt-4 bg-gray-800 p-3 rounded text-xs font-mono overflow-x-auto">
                  {step.code}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Make3D;