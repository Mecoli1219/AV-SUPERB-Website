FROM python:3.8
EXPOSE 5000
WORKDIR /app
COPY ./backend/ /app/
RUN pip install -r requirements.txt
CMD [ "uwsgi", "--ini", "app.ini"]

