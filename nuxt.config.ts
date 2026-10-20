export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: ['@fontsource-variable/outfit', '@fontsource-variable/inter', '~/assets/css/main.css'],
  nitro: { prerender: { routes: ['/'] } },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.saintboctorenergy.com.au',
      // Web3Forms access keys are designed to be public (they only route to the owner's inbox).
      web3formsKey: process.env.NUXT_PUBLIC_WEB3FORMS_KEY || '3a326010-e02c-4fed-ba5a-f9a9b3ed8c6e'
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en-AU' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0b1b33' }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  }
})
