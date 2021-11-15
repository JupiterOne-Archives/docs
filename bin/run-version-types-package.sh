#!/bin/sh -e

ROOTDIR=`pwd`

echo ""
echo "----------------------------------------------------"
echo "Versioning @jupiterone/community-docs-types"
echo "----------------------------------------------------"
echo ""

node $ROOTDIR/bin/version-types-package.js $1
