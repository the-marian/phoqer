import logging
import os.path
from datetime import date, datetime, timedelta

import boto3
import jwt
from boto3 import Session
from passlib.context import CryptContext

import config
from config import ALGORITHM, BASE_DIR, SECRET_KEY

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)  # type: ignore


def get_activation_jwt(email: str) -> str:
    delta = timedelta(hours=config.EMAIL_RESET_TOKEN_EXPIRE_HOURS)
    now = datetime.utcnow()
    expires = now + delta
    exp = expires.timestamp()
    return jwt.encode(
        {
            "exp": exp,
            "nbf": now,
            "sub": email,
        },
        key=SECRET_KEY,
        algorithm=ALGORITHM,
    )


def generete_html_from_template(template: str, context: dict[str, str]) -> str:
    return template.format(**context)


def get_ses_client() -> Session:
    ses = boto3.client(
        service_name="ses",
        region_name=config.AWS_REGION_NAME,
        aws_access_key_id=config.IAM_SES_USER_ACCESS_KEY,
        aws_secret_access_key=config.IAM_SES_USER_SECRET_KEY,
    )
    return ses


def send_email(
    email_to: str,
    subject: str,
    html_body: str,
) -> None:
    ses = get_ses_client()
    response = ses.send_email(
        Source=config.EMAILS_FROM_EMAIL,
        Destination={"ToAddresses": [email_to]},
        Message={
            "Subject": {"Data": subject},
            "Body": {"Html": {"Data": html_body}},
        },
        ReturnPath=config.RETURN_PATH_EMAIL,
    )
    logging.info(f"send email result: {response}")


def send_new_account_email(
    email_to: str,
    username: str,
    activation_token: str,
) -> None:
    with open(os.path.join(BASE_DIR, "users/email-templates/new_user.html")) as f:
        template = f.read()
    subject = f"Phoqer - New account for user {username}"
    link = f"https://phoqer.com/api/v2/users/activation/{activation_token}"
    html_body = generete_html_from_template(
        template,
        context={
            "username": username,
            "link": link,
            "registration_date": date.today().strftime("%d-%m-%Y"),
        },
    )

    send_email(
        email_to=email_to,
        subject=subject,
        html_body=html_body,
    )
