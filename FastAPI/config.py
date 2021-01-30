import os

import databases

PG_DB = os.environ.get("POSTGRES_DB")
PG_HOST = os.environ.get("POSTGRES_HOST")
PG_PASSWORD = os.environ.get("POSTGRES_PASSWORD")
PG_PORT = os.environ.get("POSTGRES_PORT")
PG_USER = os.environ.get("POSTGRES_USER")

DATABASE_URL = f"postgresql://{PG_USER}:{PG_PASSWORD}@{PG_HOST}:{PG_PORT}/{PG_DB}"
database = databases.Database(DATABASE_URL)
