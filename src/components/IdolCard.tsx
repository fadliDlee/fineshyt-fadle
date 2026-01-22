'use client'; 

import { useState } from "react";
import { motion } from "framer-motion";
import { Idol } from "@/types/idol"; 
import Link from "next/link";
import { tambahLike } from "@/app/actions"; // Import fungsi tukang catat tadi

interface IdolCardProps {
  idol: Idol;
}

export default function IdolCard({ idol }: IdolCardProps) {
  // State untuk menyimpan jumlah like sementara (biar kerasa cepet saat diklik)
  const [likes, setLikes] = useState(idol.likes || 0);
  const [isLiking, setIsLiking] = useState(false);

  // Fungsi saat tombol Love dipencet
  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault(); // Supaya gak masuk ke halaman detail saat klik love
    e.stopPropagation();
    
    if (isLiking) return; // Cegah spam klik
    
    setIsLiking(true);
    setLikes(prev => prev + 1); // Update angka di layar duluan (Optimistic)
    
    await tambahLike(idol.id); // Kirim ke database
    setIsLiking(false);
  };

  return (
    <div className="relative group h-full"> {/* Wrapper supaya tombol love bisa di atas */}
      
      {/* 1. Tombol Love Melayang (Floating Button) */}
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={handleLike}
        className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-rose-50 transition-colors border border-rose-100 flex items-center gap-1.5"
      >
        <span className="text-xl">❤️</span>
        <span className="text-sm font-bold text-rose-600 min-w-[20px] text-center">
          {likes}
        </span>
      </motion.button>

      {/* 2. Kartu Utama (Bisa diklik ke detail) */}
      <Link href={`/idol/${idol.id}`} className="block h-full"> 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }} 
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-b from-white to-rose-50 rounded-xl shadow-lg overflow-hidden border border-rose-200 cursor-pointer h-full flex flex-col hover:shadow-rose-200/50 hover:border-rose-400 transition-all"
        >
          {/* Gambar Idol */}
          <div className="h-64 w-full bg-rose-100 relative overflow-hidden">
            <img 
                src={idol.image_url} 
                alt={idol.name} 
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Info Idol */}
          <div className="p-5 relative">
            <h3 className="text-2xl font-bold text-rose-900 mb-2">{idol.name}</h3>
            
            <div className="inline-block bg-white/80 border border-rose-200 rounded-md px-2 py-1 backdrop-blur-sm">
               <p className="text-rose-600 text-xs font-bold tracking-wider uppercase">{idol.group_name}</p>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}