const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/ts/index.tsx",
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "ts-loader"
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
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss', '.css']
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: "bundle.js",
    },
}
