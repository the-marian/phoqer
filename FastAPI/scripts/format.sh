#!/bin/sh -e

set -x

isort .
black .
