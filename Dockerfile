FROM python:3.7-alpine


MAINTAINER greg

ENV PYTHONPATH="C:\\Users\\425823\\Django_projects\\myvenv\\Scripts\\python37.zip"

COPY ./requirements.txt /requirements.txt


RUN pip install --upgrade pip && \
	apk add --update --no-cache postgresql-client jpeg-dev && \
    apk add --update --no-cache --virtual .tmp-build-deps gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev && \
    apk add gcc musl-dev python3-dev libffi-dev openssl-dev && \
    pip install -r /requirements.txt && \
    apk del .tmp-build-deps

RUN sudo -u postgres psql

RUN mkdir /app
WORKDIR /app
COPY ./app /app

RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static
RUN adduser -D user
RUN chown -R user:user /vol/
RUN chmod -R 755 /vol/web
USER root

CMD ["gunicorn", "app.wsgi", "-b 0.0.0.0:8000"]