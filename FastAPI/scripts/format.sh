#!/bin/sh -e

set -x

black -l 90 ..
isort ..
