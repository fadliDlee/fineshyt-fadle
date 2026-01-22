export interface Idol {
  id: number;
  created_at: string;
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
  gallery?: string[]; // 👈 PASTIKAN INI ADA!
  likes?: number;     // 👈 PASTIKAN INI JUGA ADA (buat fitur love)
}