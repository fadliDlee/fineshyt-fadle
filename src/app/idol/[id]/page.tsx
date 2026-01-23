import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AnimasiDetail, { AnimasiFoto, AnimasiTeks, AnimasiTombolKembali } from "@/components/AnimasiDetail";
import PhotoGallery from "@/components/PhotoGallery"; 

interface PageProps {
  params: Promise<{ id: string }>;
}

// --- JURUS TIPE LOKAL ---
// Kita buat definisi tipe data LANGSUNG di sini.
// Ini 100% aman dari error "gallery not exist" dan error "unexpected any".
type IdolDetailType = {
  id: number;
  name: string;
  group_name: string;
  image_url: string;
  full_name?: string;
  birth_date?: string;
  birth_place?: string;
  nationality?: string;
  height?: string;
  blood_type?: string;
  mbti?: string;
  zodiac?: string;
  description?: string;
  gallery?: string[]; // ✅ Kita definisikan manual di sini
  likes?: number;     // ✅ Ini juga
};

export const revalidate = 0; 

export default async function IdolDetailPage({ params }: PageProps) {
  const { id } = await params;

  const { data: idolData, error } = await supabase
    .from("idols")
    .select("*")
    .eq("id", id)
    .single();

  if (!idolData || error) {
    notFound();
  }

  // Gunakan tipe lokal yang baru kita buat di atas
  const idol = idolData as IdolDetailType;

  return (
    <AnimasiDetail>
      <main className="min-h-screen py-12 px-4 md:px-8 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
        
        {/* BAGIAN BIODATA */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-12">
          <div className="flex flex-col md:flex-row">
            
            {/* Foto Profil */}
            <div className="w-full md:w-1/3 h-[500px] bg-rose-50 relative overflow-hidden">
               <AnimasiFoto>
                 <Image 
                   src={idol.image_url} 
                   alt={idol.name}
                   className="w-full h-full object-cover object-top"
                 />
               </AnimasiFoto>
            </div>

            {/* Teks Biodata */}
            <div className="w-full md:w-2/3 p-8 md:p-12">
              <AnimasiTeks delay={0.2}>
                <div className="mb-6">
                  <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-bold tracking-wide uppercase border border-rose-200">
                    {idol.group_name}
                  </span>
                  <h1 className="text-5xl font-bold text-rose-900 mt-4 mb-2">{idol.name}</h1>
                  {idol.full_name && (
                    <p className="text-xl text-gray-500 font-medium">{idol.full_name}</p>
                  )}
                </div>
              </AnimasiTeks>

              <hr className="my-8 border-rose-100" />

              <AnimasiTeks delay={0.3}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <BiodataItem label="Tanggal Lahir" value={idol.birth_date} />
                  <BiodataItem label="Tempat Lahir" value={idol.birth_place} />
                  <BiodataItem label="Kebangsaan" value={idol.nationality} />
                  <BiodataItem label="Zodiak" value={idol.zodiac} />
                  
                  <div className="flex gap-6 mt-2">
                    <MiniStat label="Tinggi" value={idol.height} />
                    <MiniStat label="Gol. Darah" value={idol.blood_type} />
                    <MiniStat label="MBTI" value={idol.mbti} />
                  </div>
                </div>
              </AnimasiTeks>

              <AnimasiTeks delay={0.4}>
                <div className="mt-10 bg-rose-50 p-6 rounded-2xl border border-rose-100">
                  <h3 className="text-lg font-bold text-rose-800 mb-3">Karier & Posisi</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {idol.description || "Belum ada informasi tambahan."}
                  </p>
                </div>
              </AnimasiTeks>

              <div className="mt-8">
                <AnimasiTombolKembali>
                  <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-rose-600 transition-colors px-4 py-2 rounded-lg hover:bg-rose-50">
                    <span>←</span> Kembali ke Home
                  </Link>
                </AnimasiTombolKembali>
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN GALERI INTERAKTIF */}
        {idol.gallery && Array.isArray(idol.gallery) && idol.gallery.length > 0 && (
            <PhotoGallery images={idol.gallery} />
        )}

      </main>
    </AnimasiDetail>
  );
}

// Komponen Kecil
function BiodataItem({ label, value }: { label: string, value?: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">{label}</p>
      <p className="text-gray-800 font-medium text-lg border-b border-rose-50 pb-2">{value}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string, value?: string }) {
  if (!value) return null;
  return (
    <div className="bg-white border border-rose-100 rounded-xl p-3 min-w-[80px] text-center shadow-sm">
      <p className="text-xs text-rose-400 font-bold mb-1">{label}</p>
      <p className="text-rose-700 font-bold text-lg">{value}</p>
    </div>
  );
}