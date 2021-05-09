import { defineConfig } from 'umi';

export default defineConfig({
  title: 'vcb-s成员介绍',
  forkTSChecker: {},

  ignoreMomentLocale: true,

  targets: {
    chrome: 70,
    firefox: 62,
    safari: 12,
    edge: false,
    ios: false,
    ie: false,
  },

  chainWebpack(memo, { env, webpack, createCSSRule }) {
    memo.module
      .rule('audio-with-file')
      .test(/\.m4a$/)
      .use('audio-with-file-loader')
      .loader('file-loader');
  },
});
