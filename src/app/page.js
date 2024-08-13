'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe, FaLink, FaLock, FaHeading, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';

export default function Home() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResults(null);
    setIsLoading(true);
    if (!url) return;

    try {
      const res = await fetch(`/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error('Failed to analyze the page.');

      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-10"
        >
          <div className="p-10 md:p-16">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-10 text-center">
              HTML Maestro
            </h1>
            <form onSubmit={handleSubmit} className="mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter a URL (e.g., https://example.com)"
                    className="w-full px-6 py-4 text-lg border-2 border-indigo-300 rounded-full focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 ease-in-out"
                    required
                  />
                  <FaGlobe className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(79, 70, 229, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={`px-10 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 ease-in-out ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze'
                  )}
                </motion.button>
              </div>
            </form>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 mb-8 rounded-lg relative"
                  role="alert"
                >
                  <span className="font-medium">Error: {error}</span>
                  <button 
                    onClick={() => setError(null)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-800"
                  >
                    &times;
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {results && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold text-indigo-800 mb-2">Analysis Results</h2>
                  <p className="text-gray-600 mb-8">Here is the detailed analysis of the provided URL.</p>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                      <ResultItem icon={<FaGlobe />} label="HTML Version" value={results.htmlVersion} />
                      <ResultItem icon={<FaHeading />} label="Page Title" value={results.pageTitle} />
                      <ResultItem icon={<FaLink />} label="Internal Links" value={results.internalLinks} />
                      <ResultItem icon={<FaExternalLinkAlt />} label="External Links" value={results.externalLinks} />
                      <ResultItem 
                        icon={<FaLock />}
                        label="Login Form Detected" 
                        value={
                          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                            results.loginFormDetected ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                          }`}>
                            {results.loginFormDetected ? 'Yes' : 'No'}
                          </span>
                        } 
                      />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-indigo-700 mb-6">Heading Structure</h3>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-indigo-100 to-purple-100">
                          <tr>
                            {results.headings.map((_, index) => (
                              <th key={index} scope="col" className="px-6 py-4 text-left text-sm font-bold text-indigo-800 uppercase tracking-wider">
                                H{index + 1}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white">
                            {results.headings.map((count, index) => (
                              <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {count}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="text-2xl font-bold text-indigo-700 mb-6">Link Analysis</h3>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                      <table className="w-full responsive-table">
                        <thead className="bg-gradient-to-r from-indigo-100 to-purple-100">
                          <tr>
                            <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-indigo-800 uppercase tracking-wider">
                              <FaLink className="inline-block mr-2" /> Link
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-indigo-800 uppercase tracking-wider">
                              <FaSpinner className="inline-block mr-2" /> Status
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-indigo-800 uppercase tracking-wider">
                              <FaExternalLinkAlt className="inline-block mr-2" /> Type
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {results.validationResults.map((result, index) => (
                            <tr 
                              key={index} 
                              className="hover:bg-indigo-50 hover:shadow transition-all duration-200"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <a href={result.href} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline">
                                  {result.href}
                                </a>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  result.status === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {result.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {result.type}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ResultItem({ icon, label, value }) {
  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center p-6 bg-white rounded-xl shadow-md"
    >
      <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mr-4">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-800">{label}</h4>
        <p className="text-lg text-gray-600">{value}</p>
      </div>
    </motion.div>
  );
}
