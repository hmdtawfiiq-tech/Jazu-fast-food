/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
import { menuData, sortByPrice } from './constants';

function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = Object.keys(menuData);
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleBack = () => {
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-maroon/10">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-50 py-3 px-6">
        <div className="max-w-[480px] mx-auto flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-xl font-black tracking-tight text-maroon">
              JAZU <span className="text-gold">FAST FOOD</span>
            </h1>
            <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-gray-400 mt-1 text-center">
              Fast • Fresh • Affordable
            </p>
          </motion.div>
        </div>
      </header>

      <main className="max-w-[480px] mx-auto px-5 py-4">
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div
              key="categories-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* MENU Header */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 w-full px-2"
                id="menu-header"
              >
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/20"></div>
                <h2 className="text-xl font-black text-maroon tracking-[0.3em] font-sans uppercase">
                  MENU
                </h2>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/20"></div>
              </motion.div>

              {/* Category buttons list - Balanced 3x3 Grid */}
              <div className="grid grid-cols-3 gap-3 pb-6 pt-2" id="category-list">
                {categories.map((cat, index) => (
                  <motion.button
                    key={cat}
                    id={`cat-btn-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryClick(cat)}
                    className="aspect-square bg-white border border-gray-100 p-2 rounded-[18px] flex items-center justify-center text-center group category-card-shadow transition-all hover:border-maroon/20 hover:shadow-md"
                  >
                    <span className="font-extrabold text-gray-800 tracking-tight text-[11px] uppercase leading-tight px-1">
                      {cat.replace('_', ' ')}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="items-screen"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-8"
              id="menu-items-list"
            >
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleBack}
                  id="back-btn"
                  className="p-3 -ml-3 rounded-full bg-maroon/5 hover:bg-maroon/10 transition-colors flex items-center justify-center group"
                >
                  <ChevronLeft className="w-7 h-7 text-maroon group-hover:text-maroon transition-colors" />
                </motion.button>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Category</span>
                  <h2 className="text-2xl font-black text-gray-900 capitalize">
                    {selectedCategory.replace('_', ' ')}
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                {(() => {
                  const sortedItems = selectedCategory === 'UGALI' || selectedCategory === 'WALI'
                    ? menuData[selectedCategory]
                    : sortByPrice(menuData[selectedCategory]);

                  return sortedItems.map((item, index) => {
                    const prevItem = index > 0 ? sortedItems[index - 1] : null;
                    const isNewGroup = prevItem && (
                      (item.name.toLowerCase().startsWith('makange') && !prevItem.name.toLowerCase().startsWith('makange')) ||
                      (item.name.toLowerCase().startsWith('changamoto') && !prevItem.name.toLowerCase().startsWith('changamoto'))
                    );

                    return (
                      <div key={`${item.name}-${index}`}>
                        {isNewGroup && <div className="h-8" />}
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.04 }}
                          className="flex items-center justify-between p-6 bg-white rounded-[20px] border border-gray-50 menu-item-shadow group"
                          id={`menu-item-${index}`}
                        >
                          <span className="font-bold text-gray-800 text-[17px] group-hover:text-maroon transition-colors text-left flex-1 pr-4">
                            {item.name}
                          </span>
                          <span className="font-black text-maroon whitespace-nowrap bg-maroon/[0.04] px-4 py-2 rounded-xl text-sm border border-maroon/5">
                            {item.price.toLocaleString()} <span className="text-[10px] font-bold opacity-70">TZS</span>
                          </span>
                        </motion.div>
                      </div>
                    );
                  });
                })()}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleBack}
                id="back-btn-bottom"
                className="w-full mt-10 py-5 border-2 border-dashed border-gray-100 text-gray-400 font-bold rounded-2xl hover:bg-gray-50 hover:text-gray-500 transition-all uppercase tracking-widest text-xs"
              >
                Back to Categories
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-16 px-6 text-center">
        <div className="w-12 h-[1px] bg-gold/30 mx-auto mb-4"></div>
        <p className="text-[11px] text-gray-300 font-bold uppercase tracking-[0.2em] mb-4">
          JAZU Fast Food © 2026
        </p>
      </footer>
    </div>
  );
}

function AdminQRPage() {
  const qrRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    // Use a high scale for printing quality
    const scale = 4;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png', 1.0);
        const downloadLink = document.createElement('a');
        downloadLink.download = 'JAZU_TABLE_QR.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    const svg64 = btoa(unescape(encodeURIComponent(svgData)));
    img.src = 'data:image/svg+xml;base64,' + svg64;
  };

  const publicUrl = `${window.location.origin}/menu`;

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-[480px] w-full">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/menu')}
          className="mb-8 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-maroon transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Menu
        </motion.button>

        <div className="bg-white p-10 rounded-[44px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-maroon uppercase tracking-tight mb-2">TABLE QR</h1>
            <div className="h-[2px] w-12 bg-gold/30 mx-auto rounded-full"></div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-3">Scan to View Menu</p>
          </div>
          
          <div 
            ref={qrRef}
            className="bg-white p-2 flex justify-center items-center mb-10"
          >
            <QRCodeSVG
              value={publicUrl}
              size={220}
              level="H"
              includeMargin={false}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          <div className="space-y-4">
            <button
              onClick={downloadQR}
              className="w-full py-5 bg-maroon text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-maroon/20 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-[0.2em]"
            >
              <Download className="w-5 h-5" />
              Download for Print
            </button>
            
            <div className="pt-6 border-t border-gray-50">
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed uppercase tracking-wider">
                Instructions:<br />
                1. Download this image<br />
                2. Print on high-quality paper<br />
                3. Place on each restaurant table
              </p>
            </div>
          </div>
        </div>

        <p className="mt-12 text-[10px] text-gray-300 font-medium uppercase tracking-[0.3em]">
          JAZU Fast Food Digital Solutions
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/menu" replace />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/admin/generator" element={<AdminQRPage />} />
      </Routes>
    </Router>
  );
}



