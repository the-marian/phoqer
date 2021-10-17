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

NEXT_PUBLIC_HOST = os.environ.get("NEXT_PUBLIC_HOST", "http://phoqer.com")

DATABASE_URL = f"postgresql://{PG_USER}:{PG_PASSWORD}@{PG_HOST}:{PG_PORT}/{PG_DB}"
TEST_DATABASE_URL = (
    f"postgresql://{PG_USER}:{PG_PASSWORD}@{PG_HOST}:{PG_PORT}/{TEST_PG_DB}"
)
database = databases.Database(DATABASE_URL)
if "pytest" in sys.modules:
    database = databases.Database(TEST_DATABASE_URL, force_rollback=True)

# pagination
CHAT_SIZE = 15
MESSAGES_SIZE = 30
NOTIFICATION_SIZE = 10
PAGE_SIZE = 12

# 60 minutes * 24 hours * 8 days = 8 days
ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
EMAIL_RESET_TOKEN_EXPIRE_HOURS = 48
SECRET_KEY: str = os.environ.get("SECRET_KEY", "please_change_me")
FERNET_SECRET_KEY: str = os.environ.get("FERNET_SECRET_KEY", "please_change_me")

SMTP_TLS = True
SMTP_PORT = 465
SMTP_HOST = os.environ.get("EMAIL_HOST", "smtp.hostinger.com")
SMTP_USER = os.environ.get("EMAIL_HOST_USER")
SMTP_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD")
EMAILS_FROM_EMAIL = "noreply@phoqer.com"
EMAILS_FROM_NAME = "Phoqer"

MEDIA_URL = "mediafiles"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MEDIA_ROOT = os.path.join(BASE_DIR, MEDIA_URL)

TECH_RENT_REQUEST = (
    "gAAAAABg_XqcM-NDoS8mDdWYrdJ-7zr5zjezCcOMwqjRDl4Dr-"
    "s1bSUyE8_zF3SWjFHOlvbaRN0yD7hSpD1QCLW2-fNP6PLhhg=="
)
