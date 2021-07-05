FROM python:3.9-buster
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH /phoqer
WORKDIR $PYTHONPATH/FastAPI
COPY build/requirements.txt build/requirements.txt
RUN pip install -r build/requirements.txt
COPY . .
ENTRYPOINT ["./build/entrypoint.sh"]
