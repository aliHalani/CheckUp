FROM python:3.7.7-alpine

WORKDIR /api

COPY . /api/

RUN apk add --no-cache mariadb-connector-c-dev g++ ;\
    apk add --no-cache --virtual .build-deps \
        build-base \
        mariadb-dev ;\
    pip install mysqlclient;\
    apk del .build-deps 

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "api.py"]