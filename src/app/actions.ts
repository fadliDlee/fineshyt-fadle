'use server';

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function tambahLike(idolId: number) {
  // 1. Ambil data like terakhir
  const { data: idol } = await supabase
    .from('idols')
    .select('likes')
    .eq('id', idolId)
    .single();

  const currentLikes = idol?.likes || 0;

  // 2. Tambah 1 dan update ke database
  const { error } = await supabase
    .from('idols')
    .update({ likes: currentLikes + 1 })
    .eq('id', idolId);

  if (error) {
    console.error("Gagal like:", error);
    return false;
  }

  // 3. Refresh halaman supaya angkanya berubah buat semua orang
  revalidatePath('/');
  return true;
}