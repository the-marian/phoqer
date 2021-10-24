FROM python:3.9-buster
WORKDIR /usr/src/app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ARG dependencies_path
RUN apt-get update \
  && apt-get -y install netcat \
  && apt-get clean
COPY $dependencies_path .
RUN pip install -r $dependencies_path
COPY . .
ENTRYPOINT ["./entrypoint.sh"]
