#!/bin/bash

# Load tests
# ==========

# Usage: bash load-test.sh


echo "Load testing https://neu-api-qa-iot.azurewebsites.net/"
echo Logging in...

# Use Artillery to login & get the bearer token into a file
artillery run login.yml -q > token.txt

# Get the token into a variable
token=$( < token.txt)

# Get the sites template file into a variable
sites_file=$( < sites-template.yml)

# Replace 'TOKEN_PLACEHOLDER' in the site template file with the token, writing the result out to sites.yml
echo "${sites_file//TOKEN_PLACEHOLDER/$token}" > sites.yml

# Use Artillery to get site ID list into a file
artillery run sites.yml -q > sites.txt

# Get the token into a variable
sites=$( < sites.txt)

# Get the js functions file into a variable
js_file=$( < sites-function-template.js)

# Replace 'SITES_PLACEHOLDER' in the js template file with the list of site IDs, writing the result out to sites-function.js
echo "${js_file//SITES_PLACEHOLDER/$sites}" > sites-function.js


echo Getting sites list...

# Use Artillery to get the site ID array into a file
artillery run sites.yml -q > sites.txt

# Get the test template file into a variable
load_test_file=$( < test-template.yml)

# Replace 'TOKEN_PLACEHOLDER' in the template file with the token, writing the result out to test.yml
echo "${load_test_file//TOKEN_PLACEHOLDER/$token}" > test.yml

echo Logged in, starting load tests...

# Run the load tests
artillery run test.yml

# artillery run -o report.json mytest.yaml
# artillery report report.json
