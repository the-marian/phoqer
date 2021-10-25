FROM python:3.9-buster
WORKDIR /usr/src/app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN apt-get update \
  && apt-get -y install netcat \
  && apt-get clean
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
ENTRYPOINT ["./entrypoint.sh"]
