#!/bin/bash
set -e
# Warning                                                  #
############################################################
Warning() {
    YELLOW="\e[33m"
    ENDCOLOR="\e[0m"

    echo -e "${YELLOW}Warning:${ENDCOLOR} $1"
}
# Help                                                     #
############################################################
Help()
{
   # Display Help
   echo
   echo "Syntax: k8s.sh [-n|-h]"
   echo "options:"
   echo "-n     Set namespace, Example: k8s.sh -n api-stage"
   echo "-h     Print this Help."
   echo
   echo "Usage:"
   echo "       k8s.sh [flags] [options]"
}

############################################################
# Process the input options. Add options as needed.        #
############################################################
# Get the options
export PROJECT_NAMESPACE=$CI_PROJECT_NAMESPACE

while getopts "n:h" option; do
   case $option in
      n) # set project namespace
         PROJECT_NAMESPACE=$OPTARG
         ;;
      h) # display Help
         Help
         exit;;
     \?) # Invalid option
         echo "Error: Invalid option"
         exit;;
   esac
done
############################################################
## set environments ##
############################################################
DIR=$(dirname $0)

source $DIR/../.env
export PROJECT_PORT=$PORT
export PROJECT_VERSION=$(cat $DIR/../package.json | jq '.version')
export PROJECT_NAME=$CI_ENVIRONMENT_SLUG-$CI_PROJECT_NAME
export PROJECT_CONFIG_MAP="$PROJECT_NAME"

############################################################
## apply kubectl ##
############################################################

echo "check namespace: ${PROJECT_NAMESPACE}"
echo ""

# init if not exist
if ! kubectl get configMap -n $PROJECT_NAMESPACE | grep -q "^$PROJECT_NAME"; then

  Warning "project configMap not exist"
  Warning "init default configMap from .k8s/templates/config.yaml"

  envsubst < $DIR/templates/config.yaml > $DIR/config.yaml

  kubectl apply -f $DIR/config.yaml
fi

#https://skofgar.ch/dev/2020/08/how-to-quickly-replace-environment-variables-in-a-file/
envsubst < $DIR/templates/k8s.yaml > $DIR/k8s.yaml
kubectl apply -f $DIR/k8s.yaml
