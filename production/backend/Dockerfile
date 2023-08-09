FROM alpine:3.7
EXPOSE 5000
VOLUME /usr/src/app/public
WORKDIR /usr/src/app
RUN apk add --no-cache \
  uwsgi-python3 \
  python3
COPY ./backend .
RUN pip3 install --no-cache-dir -r requirements.txt
CMD [ "uwsgi", "--ini", "app.ini"]

