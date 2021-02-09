import os

import databases

PG_DB = os.environ.get("POSTGRES_DB", "phoqer_dev")
PG_HOST = os.environ.get("POSTGRES_HOST", "localhost")
PG_PASSWORD = os.environ.get("POSTGRES_PASSWORD", "apple-b@nana-f1re")
PG_PORT = os.environ.get("POSTGRES_PORT", "5432")
PG_USER = os.environ.get("POSTGRES_USER", "phoqer")

DATABASE_URL = f"postgresql://{PG_USER}:{PG_PASSWORD}@{PG_HOST}:{PG_PORT}/{PG_DB}"
database = databases.Database(DATABASE_URL)

PAGE_SIZE = 4
