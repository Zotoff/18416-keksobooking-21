const path = require('path');

module.exports = {
  entry: [
    "./js/debounce.js",
    "./js/constants.js",
    "./js/network.js",
    "./js/utils.js",
    "./js/form.js",
    "./js/filter.js",
    "./js/map.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
