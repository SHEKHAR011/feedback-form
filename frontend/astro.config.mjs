// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import clerk from '@clerk/astro';

import lenis from 'astro-lenis';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), clerk(), lenis()],
  adapter: node({ mode: 'standalone' }),
  output: 'server',
});