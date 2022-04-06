const guacClient = 'http://127.0.0.1:4567'

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/tunnel': {
        target: guacClient,
        changeOrigin: true,
        ws: false
      },
      '/websocket-tunnel': {
        target: guacClient,
        changeOrigin: true,
        ws: true
      }
    }
  }
}
