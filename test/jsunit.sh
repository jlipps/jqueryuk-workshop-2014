curl -X POST https://saucelabs.com/rest/v1/$SAUCE_USERNAME/js-tests \
    -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
    -d platforms='[["OS X 10.9", "iPhone", "7.1"],
                   ["LINUX", "Android", "4.3"]]' \
    -d url="http://localhost:8081/test.html" \
    -d framework=qunit
