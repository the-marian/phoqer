#!/usr/bin/env bash

docker run -d --name pgsql -p 5432:5432 --env-file=.env.dev -v $(pwd):/var/lib/postgresql/data/ postgres:12.0-alpine