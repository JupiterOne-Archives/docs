#!/bin/sh -e

ROOTDIR=`pwd`

echo ""
echo "----------------------------------------------------"
echo "Running verify types versions to ensure all monorepo packages have the latest version of @jupiterone/community-docs-types"
echo "----------------------------------------------------"
echo ""

$ROOTDIR/bin/verify-types-versions.js
