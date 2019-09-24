const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve('./stories'),
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: { prettierConfig: { parser: 'babylon' } },
        enforce: 'pre'
      }
    ]
  }
};
