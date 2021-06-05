#!/bin/sh

cd frontend || exit
npm run lint && npm run test