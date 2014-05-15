var test = require('./common.js')
  , path = require('path');

test({
  platformName: 'iOS'
, platformVersion: '7.1'
, deviceName: 'iPhone Simulator'
, app: path.resolve(__dirname, '../moviesearch/platforms/ios/build/' +
                               'emulator/MovieSearch.app')
});
