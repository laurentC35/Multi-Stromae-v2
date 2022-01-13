#!/bin/bash

set -e

function multiBuild(){
    cd build
    for version in $(jq -r '.apps[] | .version' ../apps.json); do
        cd $version
        yarn && yarn build
        cd ..
    done
    cd ..
    
}

multiBuild