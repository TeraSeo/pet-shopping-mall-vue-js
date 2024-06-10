const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },

  devServer: {
    // proxy: "http://localhost:8080",
    proxy: {
      // '/api/auth': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      // },
      '/api/oauth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/api/auth': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      '/api/otp': {
        target: 'http://localhost:8082',
        changeOrigin: true,
      },
      '/api/product': {
        target: 'http://localhost:8083',
        changeOrigin: true,
      },
      '/api/users': {
        target: 'http://localhost:8084',
        changeOrigin: true,
      },
    }
  },
})
