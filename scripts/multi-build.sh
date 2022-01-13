#!/bin/bash

set -e

function multiBuild(){
    mkdir build
    for version in $(jq -r '.apps[] | .version' apps.json); do
        echo "Build Stromae $version"
        cd $version
        yarn && yarn build        
        cd ..
        folder="${version//\./'-'}"
        mv $version/build build/$folder
    done
    
}

multiBuild