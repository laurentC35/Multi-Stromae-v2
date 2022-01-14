#!/bin/bash

set -e

function multiBuild(){
    mkdir build
    for version in $(jq -r '.apps[] | .version' apps.json); do
        echo "Build Stromae $version"        
        folder="${version//\./'-'}"
        cd $version        
        yarn && PUBLIC_URL=/$folder yarn build        
        cd ..
        mv $version/build build/$folder
    done
    
}

multiBuild