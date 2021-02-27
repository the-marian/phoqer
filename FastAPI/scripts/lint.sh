#!/usr/bin/env bash

set -x

flake8 ..
mypy ..
