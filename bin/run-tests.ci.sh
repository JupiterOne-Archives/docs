#!/bin/sh

# Do not fail on error
set +e

export COMPOSE_PROJECT_NAME="$( basename `pwd` )-${BRANCH_NAME}-${RANDOM}"
echo "Using the following docker-compose config:"
docker-compose -f docker-compose.yaml -f docker-compose.ci.yaml config

docker-compose -f docker-compose.yaml -f docker-compose.ci.yaml run test
EXIT_CODE=${?}
docker-compose down

# Print all of the logs for debugging purposes
docker-compose logs --tail='all'

exit ${EXIT_CODE}