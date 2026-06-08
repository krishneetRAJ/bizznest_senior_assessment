import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

//Vite settings 
export default defineConfig({
  plugins: [react()],

  //Repo path to host on GitHub Pages. 
  base: '/bizznest_technical_assessment/',
});
