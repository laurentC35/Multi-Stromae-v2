#!/bin/bash

set -e

function multiBuild(){
    mkdir build
    for app in $(./jq-win64.exe '.apps | keys | .[]' apps.json); do    
        version=$(./jq-win64.exe -r ".apps[$app] | .version" apps.json)
        lunaticVersion=$(./jq-win64.exe -r ".apps[$app] | .lunaticVersion" apps.json)
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