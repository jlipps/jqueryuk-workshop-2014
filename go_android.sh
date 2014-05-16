#!/bin/sh
set -e

cd moviesearch
cordova build android
adb uninstall io.appium.MovieSearch
adb install -r ./platforms/android/ant-build/MovieSearch-debug.apk
adb shell am start io.appium.MovieSearch/io.appium.MovieSearch.MovieSearch
cd ..

