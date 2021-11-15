#!/bin/sh -e

ROOTDIR=`pwd`

function bundlePackage() {
  PACKAGE_NAME=$1

  mkdir -p ./packages/$PACKAGE_NAME/dist ./deploy/terraform/dist

  cp yarn.lock ./packages/$PACKAGE_NAME/dist

  (
    cd ./packages/$PACKAGE_NAME

    $ROOTDIR/bin/produce-production-package-json package.json
    (
      cd dist

      echo "Installing production dependencies for ${PACKAGE_NAME}..."

      # Install production dependencies
      yarn install --production --pure-lockfile

      # Remove files that we don't need to bundle in zip file
      rm -rf .yalc *.lock *.tsbuildinfo ./node_modules/aws-sdk

      zip -rq $ROOTDIR/deploy/terraform/dist/$PACKAGE_NAME.zip .
    )
  )
}

echo "Publishing to yalc"
yarn yalc-publish --monorepo

echo "Bundling community-docs"
bundlePackage community-docs-api
echo "Done bundling community-docs"
