FROM python:3.9-buster
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH /phoqer
WORKDIR $PYTHONPATH/FastAPI
COPY build/requirements.txt build/requirements.txt
RUN apt-get update && apt-get install -y netcat
RUN pip install -r build/requirements.txt
COPY . .
ENTRYPOINT ["./build/entrypoint.sh"]
