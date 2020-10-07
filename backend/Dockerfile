# pull official base image
FROM python:3.8.3-alpine

# set work directory
WORKDIR /home/share/backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# copy entrypoint-prod.sh
COPY ./entrypoint.sh /home/share/backend/entrypoint.sh

# copy project
COPY . /home/share/backend

# lint
RUN pip install --upgrade pip

# install dependencies
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# run entrypoint.sh
ENTRYPOINT ["/home/share/backend/entrypoint.sh"]