#!/bin/bash

set -ex

if [ "$1" = 'uwsgi' ]; then
  [[ -S /tmp/sockets/wsgi.sock ]] && rm /tmp/sockets/wsgi.sock
  exec $@ \
      --master \
      --processes=$UWSGI_PROCESSES \
      --threads=$UWSGI_THREADS \
      --harakiri=$UWSGI_HARAKIRI \
      --max-requests=$UWSGI_MAX_REQUESTS \
      --module=wsgi:app \
      --socket=/tmp/sockets/wsgi.sock \
      --chmod-socket=666
fi

exec "$@"
