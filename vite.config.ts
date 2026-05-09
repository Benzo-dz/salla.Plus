import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
// ✅ إصلاح مشكلة __dirname في نظام ESM
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  // ⚠️ هام: استبدل 'brins-ecom' باسم مستودع GitHub الخاص بك بالضبط
  // إذا كان الريبو باسم user.github.io، اجعل القيمة: '/'
  const repoName = 'brins-ecom'; 

  return {
    plugins: [react(), tailwindcss()],
    
    // ✅ هذا السطر هو الحل للشاشة البيضاء على GitHub Pages
    base: mode === 'production' ? `/${repoName}/` : '/',
    
    resolve: {
      alias: {
        // ✅ إصلاح مسار @ ليعمل مع ESM
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    
    // ✅ التعامل الصحيح مع المتغيرات البيئية في Vite
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    },
    
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
