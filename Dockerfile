FROM ubuntu:latest
LABEL authors="nvkvd"

ENTRYPOINT ["top", "-b"]