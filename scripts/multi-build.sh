#!/bin/bash

set -e

function multiBuild(){
    echo "Build main app"
    mkdir build && mkdir build/app
    cd app
    yarn && PUBLIC_URL=/app yarn build
    cd ..
    mv app/build/* build/app
    cp apps.json build/app/apps.json
    for app in $(jq '.apps | keys | .[]' apps.json); do    
        version=$(jq -r ".apps[$app] | .version" apps.json)
        lunaticVersion=$(jq -r ".apps[$app] | .lunaticVersion" apps.json)
        echo "Build Stromae $version with lunatic $lunaticVersion"
        folder="${lunaticVersion//\./'-'}"
        cd $lunaticVersion
        yarn
        echo "Install specific version of lunatic : $lunaticVersion"
        yarn add @inseefr/lunatic@$lunaticVersion
        PUBLIC_URL=/$folder yarn build
        cd ..
        mv $lunaticVersion/build build/$folder
    done
}

multiBuild