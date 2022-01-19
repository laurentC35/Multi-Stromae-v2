
#!/bin/bash
function replaceEnvVars(){
    # Read each line in .env file
    # Each line represents key=value pairs
    while read -r line || [[ -n "$line" ]];
    do
    # Split env variables by character `=`
    if printf '%s\n' "$line" | grep -q -e '='; then
        varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
        varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
    fi

    # Read value of current variable if exists as Environment variable
    value=$(printf '%s\n' "${!varname}")
    # Otherwise use value from .env file
    [[ -z $value ]] && value=${varvalue}

    export $varname=$value
    
    done < ../.env
    if test -f "./configuration.json"; then
        envsubst < "./configuration.json" > "configuration.temp"
        mv configuration.temp configuration.json
    fi
    if test -f "./build-configuration.json"; then
        envsubst < "./build-configuration.json" > "build-configuration.temp"
        mv build-configuration.temp build-configuration.json
    fi
    if test -f "./oidc.json"; then
        envsubst < "./oidc.json" > "oidc.temp"
        mv oidc.temp oidc.json
    fi
}

for app in */ ; do
    cd $app
    replaceEnvVars
    cd ..
done