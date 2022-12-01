# We use stock node image which allows us to use `yarn`
# to install dependencies and then perform build using
# scripts provided by this project. This node version
# doesn't need to match the target lambda environment
# Node.js version since we still use `babel` to transpile
# to the correct target runtime.
FROM node:14-bullseye-slim as builder
RUN apt-get update && apt-get install -y unzip

ENV BUILD_DIR=/opt/jupiterone/build

COPY . ${BUILD_DIR}/deploy/
COPY .npmrc ${BUILD_DIR}/deploy/

WORKDIR ${BUILD_DIR}/deploy

# Install dependencies needed by the deploy container which typically
# just consists of @jupiterone/terraform-modules which are shared modules
# that we can use in terraform files.
RUN yarn install
RUN mkdir -p ./terraform/modules && \
  cp -R ./node_modules/@jupiterone/terraform-modules/* ./terraform/modules


# Copy artifacts from previous stage into final stage.
# The old stage is discarded and will not be found in the final docker image.
# We build in a separate stage so that the build tools don't contribute
# to the size of the final docker image.
FROM 081157560428.dkr.ecr.us-east-1.amazonaws.com/base-deploy-terraform-v1.0:7
COPY --from=builder /opt/jupiterone/build/deploy/ /opt/jupiterone/deploy/
WORKDIR /opt/jupiterone/deploy
