const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // Убираем стандартное правило для SVG
    config.module
      .rule('svg')
      .exclude.add(path.resolve(__dirname, 'src/assets/icons'))
      .add(path.resolve(__dirname, 'src/assets/standalone-svg'))
      .end();

    // sprite svg
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]', // Генерация ID символа на основе имени файла
      })
      .end();

    // inline svg
    config.module
      .rule('standalone-svg')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/assets/standalone-svg'))
      .end()
      .use('raw-loader')
      .loader('raw-loader')
      .end();

    config.module
      .rule('images')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/assets/images'))
      .end()
      .type('asset/resource');
  },
});
