const path = require('path');

module.exports = {
  locales: ['en'],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localePath: path.resolve('./public/locales'),
  },
  reloadOnPrerender: true,
};
