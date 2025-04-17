#!/bin/bash

# Script to set accessKeyId and accessKeySecret environment variables

# Check if arguments are provided
if [ $# -eq 2 ]; then
    export accessKeyId="$1"
    export accessKeySecret="$2"
    echo "Environment variables set:"
    echo "accessKeyId=$accessKeyId"
    echo "accessKeySecret=$accessKeySecret"
elif [ $# -eq 0 ]; then
    # Prompt for values if no arguments
    read -p "Enter accessKeyId: " id
    read -p "Enter accessKeySecret: " secret
    export accessKeyId="$id"
    export accessKeySecret="$secret"
    echo "Environment variables set:"
    echo "accessKeyId=$accessKeyId"
    echo "accessKeySecret=$accessKeySecret"
else
    echo "Usage: source $0 [accessKeyId accessKeySecret]"
    echo "Or use without arguments to be prompted for values."
    echo "Important: Run with 'source' to affect current shell:"
    echo "  source $0"
    echo "  . $0"
    exit 1
fi 