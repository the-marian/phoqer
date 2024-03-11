FROM python:3.9-buster
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
EXPOSE 8000
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD [ "python3", "main.py"]

