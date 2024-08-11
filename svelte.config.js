import adapter from '@sveltejs/adapter-static'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'

const dev = process.argv.includes('dev')

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      '@': './src/components',
    },
    paths: {
      base: dev ? '' : process.env.BASE_PATH,
    },
  }
}

export default config
