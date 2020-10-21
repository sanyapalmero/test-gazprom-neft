const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/ts/index.jsx",
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
            test: /\.scss$|\.css$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: "style.css"
                    }
                },
                'extract-loader',
                "css-loader",
                "sass-loader",
            ]
        },
        ]
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: "bundle.js",
    },
}
