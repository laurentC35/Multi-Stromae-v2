#!/bin/bash
# title           :multi-clone.sh
# description     :According to apps.json file, clone all version
# author          :Laurent Caouissin

set -e

function multiClone(){
    mkdir build
    cd build
    for version in $(jq -r '.apps[] | .version' apps.json); do
        git clone https://github.com/InseeFr/Stromae --branch $version --single-branch $version
    done
    cd ..
}

multiClone