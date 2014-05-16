#!/bin/sh
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
rm -rf ./MovieSearch*
cd ../moviesearch/platforms/ios/build/emulator
zip -r ../../../../../test/MovieSearch.app.zip MovieSearch.app
cd ../../../../../test
curl -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY -X POST "http://saucelabs.com/rest/v1/storage/$SAUCE_USERNAME/MovieSearch.app.zip?overwrite=true" -H "Content-Type: application/octet-stream" --data-binary @MovieSearch.app.zip
