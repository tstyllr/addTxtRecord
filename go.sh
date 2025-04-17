#!/bin/bash

# 检查参数数量
if [ $# -ne 3 ]; then
    echo "Usage: $0 <rr> <domainName> <value>"
    exit 1
fi

# 设置环境变量
export rr=$1
export domainName=$2
export value=$3

# 执行node index.js
node index.js
