/// <reference types="vitest" />
import {resolve} from 'path'
import externals from 'rollup-plugin-node-externals'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  return {
    build: {
      lib: {
        entry: {
          index: resolve(__dirname, 'src/index.ts')
        },
        formats: ['es', 'cjs']
      },
      minify: false,
      rollupOptions: {
        output: {
          exports: 'named',
          dir: 'dist',
          preserveModules: true
        }
      }
    },
    plugins: [dts({insertTypesEntry: true}), command === 'build' && externals()],
    test: {
      environment: 'jsdom',
      reporters: ['verbose', 'junit'],
      outputFile: {
        junit: './junit.xml'
      }
    }
  }
})
