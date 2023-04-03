// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import copy from 'rollup-plugin-copy'; // импортируем плагин copy

export default defineConfig({
  base: '/vue-crud/',
  plugins: [
    vue(),
    copy({ // добавляем настройки плагина copy
      targets: [
        { src: './index.html', dest: 'dist' }, // копируем index.html из src в dist
        { src: 'src/assets', dest: 'dist' }, // копируем папку assets из src в dist
      ],
    }),
  ],
});