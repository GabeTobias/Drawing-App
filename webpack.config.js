const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    //Entry points for runtime javascript & Tailwinf
    bundle: './src/scripts/index.js',
    styles: './src/styles/tailwind.css',
  },
  mode: 'development',
  output: {
    //Export all files to the package_ forlder
    path: path.resolve(__dirname, './src/package_'),
    filename: '[name].js'
  },
  plugins:[
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        //Rules for Tailwind
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          //Add css file to javascript
          { loader: MiniCssExtractPlugin.loader },
          //Load CSS from imports
          'css-loader',
          //Transform raw css
          'postcss-loader',
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ]
  }
};
