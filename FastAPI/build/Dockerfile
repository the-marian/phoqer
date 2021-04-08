FROM python:3.8-alpine
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH /phoqer
WORKDIR $PYTHONPATH/FastAPI
COPY build/requirements.txt build/requirements.txt
RUN apk add --no-cache --virtual .build-deps \
  g++ gcc musl-dev libxslt-dev libffi-dev \
    && pip install -r build/requirements.txt \
    && find /usr/local \
        \( -type d -a -name test -o -name tests \) \
        -o \( -type f -a -name '*.pyc' -o -name '*.pyo' \) \
        -exec rm -rf '{}' + \
    && runDeps="$( \
        scanelf --needed --nobanner --recursive /usr/local \
                | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
                | sort -u \
                | xargs -r apk info --installed \
                | sort -u \
    )" \
    && apk add --virtual .rundeps $runDeps \
    && apk del .build-deps
COPY . .
ENTRYPOINT ["./build/entrypoint.sh"]
