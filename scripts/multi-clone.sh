#!/bin/bash
# title           :multi-clone.sh
# description     :According to apps.json file, clone all version
# author          :Laurent Caouissin

set -e

function multiClone(){
    for app in $(jq '.apps | keys | .[]' apps.json); do    
        version=$(jq -r ".apps[$app] | .version" apps.json)
        lunaticVersion=$(jq -r ".apps[$app] | .lunaticVersion" apps.json)
        git clone https://github.com/laurentC35/Stromae.git --branch $version --single-branch $lunaticVersion --depth 1
    done
}

multiClone