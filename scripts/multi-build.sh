#!/bin/bash

set -e

function multiBuild(){
    for version in $(../jq-win64.exe -r '.apps[] | .version' ../apps.json); do
        cd $version
        yarn && yarn build
        cd ..
    done
    
}

multiBuild()