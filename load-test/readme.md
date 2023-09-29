## Load tests

Fires off 40 requests per second, over a period of 20 seconds, to a randomly selected API endpoint, using a randomly selected SiteID (If applicable).

To install Artillery: `npm install -g artillery`

To run the load tests: `bash load-test.sh`

To change the target base URL, edit `login.yml`, `sites-template.yml` & `test-template.yml` files.

`sites-template.yml`, `test-template.yml` & `sites-function-template.js` are source files used by the `load-test.sh` bash script. It replaces placeholders in these files with actual values retrieved early (Bearer token, sites ID list), before writing out the executable versions of the files.
