import { defineConfig } from 'vite';
import RubyPlugin from 'vite-plugin-ruby';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    RubyPlugin(),
    react(),
    eslint(),
  ],
});
