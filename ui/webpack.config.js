const path = require("path");

module.exports = {
  entry: "./src/custom/run.tsx",

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      handlebars: "handlebars/dist/handlebars.js",
      "h2o-wave": path.resolve(__dirname, "src/custom/wave"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /\.test\.tsx?$/],
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.json",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  }

}

/*
module.exports = {
  entry: "./src/custom/run.tsx",
  output: {
    path: path.join(__dirname, "lib/run"),
    filename: "[name].bundle.js",
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: "production",
  devtool: false,
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      handlebars: "handlebars/dist/handlebars.js",
    },
  },
  devServer: {
    //contentBase: path.join(__dirname, "src")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /\.test\.tsx?$/],
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.json",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [],
};
*/
