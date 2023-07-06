import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    server: {
      host: true,
      proxy: {
        '/api': {
          target: 'http://0.0.0.0:8080',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      target: 'es2020',
      rollupOptions: {
        input: {
          main: './index.html',
          encyclopedia: './encyclopedia.html',
          maps: './maps.html',
          login: './login.html',
          signup: './signup.html',
        },
      },
    },
  });
};
