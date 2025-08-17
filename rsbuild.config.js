import { defineConfig } from '@rsbuild/core';
import { VueLoaderPlugin } from 'vue-loader';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
// import {pluginVue} from '@rsbuild/plugin-vue'
import { pluginLess } from '@rsbuild/plugin-less';

const path = require('path');

module.exports = defineConfig({
  // 入口文件
  source: {
    entry: {
      index: './src/main.js'
    },
  },

  // 输出配置
  output: {
    distPath: {
      root: 'dist',
    },
  },

  // 配置 HTML 模板
  html: {
    template: './public/index.html',
  },

  // 配置模块规则
  tools: {
    rspack: (config) => {
      config.resolve = {
        ...config.resolve,
        alias: {
          // 清除可能存在的默认别名
          ...(config.resolve?.alias || {}),
          // 强制设置别名
          '@': path.join(__dirname, 'src'),
        },
        // 确保扩展名为 .vue 的文件能被正确解析
        extensions: ['.vue', '.js', '.json', ...(config.resolve?.extensions || [])]
      };
      // 添加 .vue 文件处理规则
      config.module.rules.push({
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compiler: require('vue-template-compiler')
            }
          }
        ]
      });

      // 添加 CSS 处理规则
      config.module.rules.push({
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      });

      // 添加图片资源处理规则
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      });
      config.ignoreWarnings = [
        {
          module: /sharp/, // 忽略来自 sharp 的警告
        },
      ];
      // 确保插件数组存在
      if (!config.plugins) {
        config.plugins = [];
      }

      // 添加 VueLoaderPlugin 插件
      config.plugins.push(new VueLoaderPlugin());

      return config;
    }
  },
  resolve: {
    alias: {
      async_hooks: path.join(__dirname, './src/scripts/blank_polyfill.js'),
      'node:async_hooks': path.join(
        __dirname,
        './src/scripts/blank_polyfill.js',
      )
    }
  },
  // 配置插件
  plugins: [pluginNodePolyfill(), pluginLess()],

  // 开发服务器配置
  dev: {
    port: 3000,
    open: true,
  },
});
