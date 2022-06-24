import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Adai Design',
  mode: 'site',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  // navs: {
  //   'en-US': [
  //     null,
  //     {
  //       title: 'GitHub',
  //       path: 'https://github.com/ant-design/pro-components',
  //     },
  //   ],
  //   'zh-CN': [
  //     null,
  //     {
  //       title: 'GitHub',
  //       path: 'https://github.com/ant-design/pro-components',
  //     },
  //   ],
  // },
  hash: true,
  exportStatic: {},
  targets: {
    chrome: 80,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  webpack5: {},
});