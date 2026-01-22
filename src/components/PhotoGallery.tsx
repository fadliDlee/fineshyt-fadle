'use client'; // Wajib ada karena pakai useState (interaksi)

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PhotoGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto mt-12 pb-12">
      
      {/* JUDUL GALERI */}
      <h2 className="text-3xl font-bold text-rose-900 mb-6 flex items-center gap-3">
        Galeri Foto <span className="text-lg bg-rose-200 text-rose-700 px-2 py-1 rounded-lg">📸</span>
      </h2>

      {/* GRID FOTO KECIL */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((fotoUrl, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedImage(fotoUrl)} // Saat diklik, simpan URL foto
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <img 
              src={fotoUrl} 
              alt={`Foto Gallery ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay Pink + Ikon Mata saat hover */}
            <div className="absolute inset-0 bg-rose-900/0 group-hover:bg-rose-900/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 font-bold text-sm tracking-wider transition-opacity duration-300">LIHAT</span>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL / LIGHTBOX (LAYAR PENUH) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)} // Klik background hitam untuk tutup
          >
            {/* Tombol Close (X) */}
            <button 
              className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Foto Besar */}
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage} 
              alt="Foto Besar" 
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()} // Supaya klik foto tidak menutup modal
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}