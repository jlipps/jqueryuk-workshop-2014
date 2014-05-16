var test = require('./common.js')
  , path = require('path')
  , onSauce = process.env.SAUCE
  , localApp = path.resolve(__dirname, '../moviesearch/platforms/ios/' +
                                       'build/emulator/MovieSearch.app')
  , sauceApp = 'sauce-storage:MovieSearch.app.zip';

var caps = {
  platformName: 'iOS'
, platformVersion: '7.1'
, deviceName: 'iPhone Simulator'
, browserName: ''
, app: localApp
};

if (onSauce) {
  caps['appium-version'] = '1.0.0';
  caps.app = sauceApp;
}

test(caps);
