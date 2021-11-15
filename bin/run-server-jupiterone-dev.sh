#!/bin/sh

set -e

yarn start:containers -d

export USING_LOCAL_STACK='false'

yarn nodemon --exec './tools/bin/run-service.sh | yarn bunyan' --watch src --watch tools -e ts,js --delay 3