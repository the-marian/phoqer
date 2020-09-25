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

# copy project
COPY . .

# lint
RUN pip install --upgrade pip
RUN pip install flake8
RUN flake8 --ignore=E501 .

# install dependencies
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy entrypoint.sh
#COPY ./entrypoint.sh .

# run entrypoint.sh
ENTRYPOINT ["/home/share/backend/entrypoint.sh"]