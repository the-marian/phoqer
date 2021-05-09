# phoqer

Чтобы запустить backend нужно:

1. Имень установлен Docker https://download.docker.com/mac/stable/Docker.dmg

2. Для удобства я храню все env var в одном файле .env.dev, который нужно заполнить

3. Ввести в терминале

```console
docker-compose -f docker-compose.dev.yml up -d --build
```

4.Фсё

# Wiki
Чтобы заглянуть в логи нужно ввести в консоль `docker-compose logs -f`
или можно посмотреть логи с конкретного контейнера, пример для контейнера с сервером Django `docker-compose logs -f backend`

Вот так можно вводить команды внутри контейнеров `docker-compose -f docker-compose.yml exec backend python manage.py migrate`

Если по какой-то причине хочется запустить Django без NGINX в виде прохи и сервера для статики то такая возможность тоже учтена

просто из директории `backend` нужно сделать следующее

```console
docker build -f ./Dockerfile -t backend:latest . 

Successfully built bla-bla-bla
Successfully tagged backend:latest

docker run -d \
    -p 8006:8000 \
    -e "SECRET_KEY=please_change_me" -e "DEBUG=1" -e "DJANGO_ALLOWED_HOSTS=*" \
    backend python /home/share/backend/manage.py runserver 0.0.0.0:8000
```

после чего сервер будет доступен по адресу http://127.0.0.1:8006/