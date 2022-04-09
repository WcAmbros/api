#!/bin/bash
set -e
# Warning                                                     #
############################################################
Warning() {
    YELLOW="\e[33m"
    ENDCOLOR="\e[0m"

    echo "${YELLOW}Warning:${ENDCOLOR} $1"
}
# Help                                                     #
############################################################
Help()
{
   # Display Help
   echo
   echo "Syntax: k8s.sh [-s|-h]"
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

while getopts ":hs:" option; do
   case $option in
      h) # display Help
         Help
         exit;;
      n) # Enter a name
         PROJECT_NAMESPACE=$OPTARG
         ;;
     \?) # Invalid option
         echo "Error: Invalid option"
         exit;;
   esac
done
############################################################
## set environments ##
############################################################
if test -z PROJECT_NAMESPACE
then
  Warning "set gitlab project namespace: $CI_PROJECT_NAMESPACE"
  export PROJECT_NAMESPACE=$CI_PROJECT_NAMESPACE
fi
echo "ls .."
ls ..
echo "ls"
ls

source ../.env
#export CONTAINER_VERSION=gitlab-$CI_COMMIT_SHORT_SHA
export PROJECT_PORT=$PORT
export PROJECT_VERSION=$(cat ../package.json | jq '.version')
export PROJECT_NAME=$CI_PROJECT_NAME
export PROJECT_CONFIG_MAP="$PROJECT_NAME-config"

#export IMAGE_PATH=$CONTAINER_REGISTRY/$PROJECT_NAMESPACE/$PROJECT_NAME:$CONTAINER_VERSION

############################################################
## apply kubectl ##
############################################################

echo "check namespace: ${PROJECT_NAMESPACE}"
echo ""

# init if not exist
if ! kubectl get configMap -n $PROJECT_NAMESPACE | grep -q "^$PROJECT_NAME"; then

  Warning "project configMap not exist"
  Warning "init default configMap from templates/config.yaml"

  envsubst < templates/config.yaml > config.yaml

  kubectl apply -f config.yaml
fi

#https://skofgar.ch/dev/2020/08/how-to-quickly-replace-environment-variables-in-a-file/
envsubst < templates/k8s.yaml > k8s.yaml
kubectl apply -f k8s.yaml