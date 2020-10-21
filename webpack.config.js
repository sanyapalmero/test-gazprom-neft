const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.jsx",
    output: {
        path: path.join(__dirname, 'public'),
        filename: "bundle.js",
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.s(a|c)ss$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: { modules: true }
              },
              'sass-loader'
            ]
          }
        ]
    }
}
