import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, RefreshCw, Copy } from 'react-feather';
import { useLanguage } from '../../contexts/LanguageContext';

// Import language files
import enOptimizer3D from '../data/text/en/optimizer3d.json';
import zhOptimizer3D from '../data/text/zh/optimizer3d.json';
import jaOptimizer3D from '../data/text/ja/optimizer3d.json';
import esOptimizer3D from '../data/text/es/optimizer3d.json';

const languageMap = {
  en: enOptimizer3D,
  zh: zhOptimizer3D,
  ja: jaOptimizer3D,
  es: esOptimizer3D,
};

interface Optimizer3DContent {
  header: { title: string; description: string };
  input: { title: string; placeholder: string; optimizeButton: string; optimizing: string };
  output: { title: string; copied: string; empty: string; optimizing: string };
}

const CodeOptimizer3D: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const content = languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en;

  const [inputCode, setInputCode] = useState('');
  const [optimizedCode, setOptimizedCode] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [copied, setCopied] = useState(false);

  const optimizeCode = () => {
    if (!inputCode.trim()) return;
    setIsOptimizing(true);
    setTimeout(() => {
      const optimized = optimizeCodeLogic(inputCode);
      setOptimizedCode(optimized);
      setIsOptimizing(false);
    }, 1500);
  };

  const optimizeCodeLogic = (code: string) => {
    let optimized = code;
    // Remove console logs
    optimized = optimized.replace(/console\.log\(.*\);?/g, '');
    // Use const/let instead of var
    optimized = optimized.replace(/var\s+/g, 'const ');
    // Add error handling
    if (!optimized.includes('try {')) {
      optimized = '// Added error handling\ntry {\n' + optimized + '\n} catch (e) {\n    console.error("3D Game error:", e);\n}';
    }
    // Add performance comment
    if (optimized.includes('new THREE')) {
      optimized += '\n\n// Reuse Three.js objects to optimize memory';
    }
    return optimized;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(optimizedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {content.header.title}
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">{content.header.description}</p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Code className="mr-2 text-blue-400" />
              {content.input.title}
            </h2>
            <textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder={content.input.placeholder}
              className="w-full h-64 bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
            <button
              onClick={optimizeCode}
              disabled={isOptimizing || !inputCode.trim()}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              {isOptimizing ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {content.input.optimizing}
                </span>
              ) : (
                content.input.optimizeButton
              )}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <RefreshCw className="mr-2 text-green-400" />
                {content.output.title}
              </h2>
              <button
                onClick={copyToClipboard}
                disabled={!optimizedCode}
                className="p-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                title="Copy to clipboard"
              >
                <Copy size={16} />
              </button>
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
            {optimizedCode ? (
              <div className="bg-gray-900 rounded-lg p-4 overflow-auto h-64">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">{optimizedCode}</pre>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-6 text-center h-64 flex items-center justify-center">
                <div>
                  <RefreshCw size={32} className="mx-auto text-gray-500 mb-2" />
                  <p className="text-gray-400">
                    {isOptimizing ? content.output.optimizing : content.output.empty}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CodeOptimizer3D;