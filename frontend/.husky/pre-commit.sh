#!/bin/sh

. "$(dirname "$0")/_/husky.sh"

cd ./frontend/ || exit
npm run lint && npm run test