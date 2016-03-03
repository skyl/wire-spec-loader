var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],

    files: [
        './../../../node_modules/phantomjs-polyfill/bind-polyfill.js',
        './tests.bundle.js'
    ],

    frameworks: [ 'chai', 'mocha' ],

    plugins: [
        'karma-phantomjs-launcher',
        'karma-chai',
        'karma-mocha',
        'karma-sourcemap-loader',
        'karma-osx-reporter',
        'karma-webpack'
    ],

    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
        './tests.bundle.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'dots', 'osx' ],

    singleRun: false,

    // webpack config object
    webpack: {
        devtool: 'inline-source-map',
        module: {
            loaders: [
                {   
                    test: /\.spec\.coffee$/, 
                    loaders: ['../../index?markup=component&componentsDir=../../fixture/components/'],
                    exclude: /node_modules/
                },
                {   
                    test: /\.js?$/,
                    loader: 'babel',
                    exclude: /node_modules/
                }
            ],
        },
        plugins: [
            new webpack.IgnorePlugin(/\.json$/),
            new webpack.NoErrorsPlugin()
        ]
    },

    webpackMiddleware: {
        noInfo: true
    }

  });
};