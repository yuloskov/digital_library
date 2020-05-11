FROM python:3.7-buster

# Main application setup
WORKDIR /application

ARG BASE_DIR

COPY ${BASE_DIR}/requirements.txt .

RUN pip3 install -r requirements.txt

COPY ${BASE_DIR} .

CMD ["pytohn", "insert_user.py", "admin", "admin", "admin"]
CMD ["pytohn", "insert_user.py", "user", "user", "user"]


ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["uwsgi"]
