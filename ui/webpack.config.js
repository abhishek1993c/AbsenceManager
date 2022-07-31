const path = require('path');
module.exports = {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.ts|\.tsx$/,
            loader: "ts-loader",
          },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      }
};
