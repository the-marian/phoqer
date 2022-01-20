import os
import sys

import databases

ALGORITHM = "HS256"

PG_DB = os.environ.get("POSTGRES_DB", "phoqer_dev")
TEST_PG_DB = os.environ.get("TEST_POSTGRES_DB", "test_phoqer_dev")
PG_HOST = os.environ.get("POSTGRES_HOST", "localhost")
PG_PASSWORD = os.environ.get("POSTGRES_PASSWORD", "apple-b@nana-f1re")
PG_PORT = os.environ.get("POSTGRES_PORT", "5432")
PG_USER = os.environ.get("POSTGRES_USER", "phoqer")

NEXT_PUBLIC_HOST = os.environ.get("NEXT_PUBLIC_HOST", "https://phoqer.com")

DATABASE_URL = f"postgresql://{PG_USER}:{PG_PASSWORD}@{PG_HOST}:{PG_PORT}/{PG_DB}"
TEST_DATABASE_URL = (
    f"postgresql://{PG_USER}:{PG_PASSWORD}@{PG_HOST}:{PG_PORT}/{TEST_PG_DB}"
)
database = databases.Database(DATABASE_URL)
if "pytest" in sys.modules:
    database = databases.Database(TEST_DATABASE_URL)

# pagination
CHAT_SIZE = 15
MESSAGES_SIZE = 30
NOTIFICATION_SIZE = 10
PAGE_SIZE = 12
POPULAR_SEARCH_SIZE = 9

# 60 minutes * 24 hours * 8 days = 8 days
ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
EMAIL_RESET_TOKEN_EXPIRE_HOURS = 48
SECRET_KEY: str = os.environ.get("SECRET_KEY", "please_change_me")
FERNET_SECRET_KEY: str = os.environ.get("FERNET_SECRET_KEY", "please_change_me")

EMAILS_FROM_EMAIL = "noreply@phoqer.com"
RETURN_PATH_EMAIL = "lost@phoqer.com"

MEDIA_URL = "mediafiles"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

TECH_RENT_REQUEST = (
    "gAAAAABg_XqcM-NDoS8mDdWYrdJ-7zr5zjezCcOMwqjRDl4Dr-"
    "s1bSUyE8_zF3SWjFHOlvbaRN0yD7hSpD1QCLW2-fNP6PLhhg=="
)

# AWS

AWS_REGION_NAME = "eu-central-1"
BUCKET_NAME = "phoqer-images"
IAM_SES_USER_ACCESS_KEY = os.environ.get("IAM_SES_USER_ACCESS_KEY")
IAM_SES_USER_SECRET_KEY = os.environ.get("IAM_SES_USER_SECRET_KEY")
