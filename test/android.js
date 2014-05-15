var test = require('./common.js')
  , path = require('path');

test({
  platformName: 'Android'
, platformVersion: '4.4'
, deviceName: 'Android Emulator'
, app: path.resolve(__dirname, '../moviesearch/platforms/android/ant-build/' +
                               'MovieSearch-debug.apk')
});

