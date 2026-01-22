'use client'; // Wajib karena pakai Framer Motion

import { motion } from "framer-motion";

export default function AnimasiDetail({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

// Animasi Khusus Foto (Zoom In)
export const AnimasiFoto = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0, y: 20 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

// Animasi Khusus Teks (Slide Up Berurutan)
export const AnimasiTeks = ({ children, delay = 0.2 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// Animasi Tombol Kembali (Bouncy)
export const AnimasiTombolKembali = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileHover={{ x: -5 }} // Geser kiri dikit pas di-hover
    whileTap={{ scale: 0.9 }} // Mengecil pas diklik
  >
    {children}
  </motion.div>
);