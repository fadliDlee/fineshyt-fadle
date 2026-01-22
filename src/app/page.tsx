// src/app/page.tsx

import { supabase } from "@/lib/supabase"; 
import IdolCard from "@/components/IdolCard";
import { Idol } from "@/types/idol";

export const revalidate = 0; 

export default async function Home() {
  
  const { data: idols, error } = await supabase
    .from("idols")
    .select("*")
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error ambil data:", error);
  }

  return (
    // 👇 INI DIA: Gradasi Pastel Lembut (Pink Muda - Ungu Muda - Biru Muda)
    // Warnanya dominan putih/terang, bikin foto idol kelihatan bersih.
    <main className="min-h-screen p-8 md:p-12 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex flex-col items-start text-left">
          
          {/* Judul: Pink Gelap (text-pink-600) supaya terbaca jelas di background terang */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-pink-600">
            fineshyt nya fadle <span className="text-black">🔥</span>
          </h1>
          
          {/* Deskripsi: Abu-abu gelap (Gray-700) */}
          <p className="text-gray-700 text-lg font-medium border-l-4 border-pink-400 pl-4">
            Koleksi idola pilihan paling top tier.
          </p>
        </div>
        
        {/* Grid Kartu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(idols as Idol[] || []).map((idol) => (
            <IdolCard key={idol.id} idol={idol} />
          ))}
        </div>

      </div>
    </main>
  );
}