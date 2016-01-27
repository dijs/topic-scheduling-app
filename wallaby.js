module.exports = function (wallaby) {
  return {
    files: [{
      pattern: 'src/**/*.js'
    }],
    tests: [{
      pattern: 'test/**/*.js'
    }],
    env: {
      type: 'node'
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['es2015', 'react']
      })
    },
    debug: true
  }
}
