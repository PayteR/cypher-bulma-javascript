const mix = require('laravel-mix');

mix.copy('node_modules/bulma_scss/css/bulma.css', 'public/dist')
  .js('index.js', 'public/dist')
  .browserSync({
    proxy: 'http://127.0.0.1:19051',
    files: ["public/**/*"],
    port: 19053,
    ui: {
      port: 19054
    },
    watch: true
  });
