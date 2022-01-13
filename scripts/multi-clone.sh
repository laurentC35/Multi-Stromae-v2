#!/bin/bash
# title           :multi-clone.sh
# description     :According to apps.json file, clone all version
# author          :Laurent Caouissin

set -e

function multiClone(){
    for version in $(../jq-win64.exe -r '.apps[] | .version' ../apps.json); do
        git clone https://github.com/InseeFr/Stromae --branch $version --single-branch $version
    done
}

multiClone