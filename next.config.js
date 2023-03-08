module.exports = {
  publicRuntimeConfig: {
    site: {
      name: 'chatProfile',
      url:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://earvinpiamonte-nextjs-tailwindcss-template.vercel.app',
      title: 'chatProfile Demo',
      description: 'This is a demo of chatProfile',
      socialPreview: '/images/preview.png',
    },
    api: {
      key: 'example',
    }
  },
  swcMinify: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
};
