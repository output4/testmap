module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          "less-loader",
        ],
      },
    ],
  },
  css: {
    loaderOptions: {
      css: {
        modules: {
          auto: () => true
        }
      }
    }
  }
};
