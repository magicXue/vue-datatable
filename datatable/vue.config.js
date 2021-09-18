module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    // disableHostCheck: true,
    // port: 4000,
    // public: '0.0.0.0:4000',
    proxy: {
      '/api': {
        target: 'https://www.fruityvice.com',
        changeOrigin: true,
      },
    }
  },
  publicPath: "/"
}
