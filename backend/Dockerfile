# pull official base image
FROM python:3.8.7-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /home/phoqer/backend

# in this steep I build psycopg2 binary from sounrce
# since psycopg2-binary won't run on alpine
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    python3-dev \
    musl-dev \
    postgresql-dev \
    && pip install --no-cache-dir psycopg2 \
    && apk del --no-cache .build-deps

COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . /home/phoqer/backend
ENTRYPOINT ["/home/phoqer/backend/entrypoint.sh"]
