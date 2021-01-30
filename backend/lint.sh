#!/usr/bin/env bash

set -x

isort .
black .
flake8 .
