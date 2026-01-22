// src/components/IdolCard.tsx
'use client'; 

import { motion } from "framer-motion";
import { Idol } from "@/types/idol"; 
import Link from "next/link";

interface IdolCardProps {
  idol: Idol;
}

export default function IdolCard({ idol }: IdolCardProps) {
  return (
    <Link href={`/idol/${idol.id}`}> 
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }} 
        transition={{ duration: 0.3 }}
        // 👇 UBAH DI SINI:
        // 1. Background: Putih ke Pink (Rose-50)
        // 2. Border: Pink (Rose-200)
        // 3. Shadow: Pink lembut saat di-hover
        className="bg-gradient-to-b from-white to-rose-50 rounded-xl shadow-lg overflow-hidden border border-rose-200 cursor-pointer h-full flex flex-col group hover:shadow-rose-200/50 hover:border-rose-400 transition-all"
      >
        {/* Gambar Idol */}
        {/* Placeholder background jadi Pink muda (rose-100) */}
        <div className="h-64 w-full bg-rose-100 relative overflow-hidden">
          <img 
              src={idol.image_url} 
              alt={idol.name} 
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Info Idol */}
        <div className="p-5 relative">
          {/* 👇 Nama Idol: Pink Gelap (Rose-900) */}
          <h3 className="text-2xl font-bold text-rose-900 mb-2">{idol.name}</h3>
          
          {/* 👇 Badge Grup: Putih transparan, Teks Pink */}
          <div className="inline-block bg-white/80 border border-rose-200 rounded-md px-2 py-1 backdrop-blur-sm">
             <p className="text-rose-600 text-xs font-bold tracking-wider uppercase">{idol.group_name}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}