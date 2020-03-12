#!/usr/bin/env sh

set -ex

# Install packages and build the source
npm install
npm run build

exec "$@"
