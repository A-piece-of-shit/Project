import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'


import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// 引入path模块
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());


  return {
    plugins: [
      vue(),

      // 创建svg插件
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),

      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    // 路径映射
    resolve: {
      alias: {
        "@": path.resolve(__dirname + '/src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/style/global.scss";'
        }
      }
    },
    proxy: {
      [env.VITE_URL]: {
        target: env.VITE_SERVE,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
});



