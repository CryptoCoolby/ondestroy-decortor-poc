module.exports = {
  externals: [
    {
      // String
      react: 'react',
      // Object
      lodash: {
        commonjs: 'lodash',
        amd: 'lodash',
        root: '_', // indicates global variable
      },
      // [string]
      subtract: ['./math', 'subtract'],
    },
    // Function
    function (asd, request, callback) {


      if ( /.*\.mock$/.test(request)) {
        console.log('\n', asd,'\n',  request, '\n', callback);
        return callback(null, 'window');
      }
      callback();
    },

    // Regex
    /^(jquery|\$)$/i,
  ],
};
