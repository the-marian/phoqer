import logging
import os.path
from datetime import date, datetime, timedelta
from typing import Any, Dict

import emails
import jwt
from emails.template import JinjaTemplate
from FastAPI import config
from FastAPI.config import ALGORITHM, SECRET_KEY
from passlib.context import CryptContext

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


def send_email(
    email_to: str,
    subject_template: str,
    html_template: str,
    environment: Dict[str, Any],
) -> None:
    message = emails.Message(
        subject=JinjaTemplate(subject_template),
        html=JinjaTemplate(html_template),
        mail_from=(config.EMAILS_FROM_NAME, config.EMAILS_FROM_EMAIL),
    )
    smtp_options = {"host": config.SMTP_HOST, "port": config.SMTP_PORT}
    if config.SMTP_TLS:
        smtp_options["tls"] = True
    if config.SMTP_USER:
        smtp_options["user"] = config.SMTP_USER
    if config.SMTP_PASSWORD:
        smtp_options["password"] = config.SMTP_PASSWORD
    response = message.send(to=email_to, render=environment, smtp=smtp_options)
    logging.info(f"send email result: {response}")


def send_new_account_email(
    email_to: str,
    username: str,
    activation_token: str,
) -> None:
    subject = f"Phoqer - New account for user {username}"
    with open(os.path.join(os.getcwd(), "email-templates/build/new_account.html")) as f:
        template_str = f.read()
    link = f"http://phoqer.com/api/v2/users/activation/{activation_token}"
    send_email(
        email_to=email_to,
        subject_template=subject,
        html_template=template_str,
        environment={
            "project_name": "Phoqer",
            "username": username,
            "email": email_to,
            "link": link,
            "registration_date": date.today().strftime("%d-%m-%Y"),
        },
    )
