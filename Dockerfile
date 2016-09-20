FROM node:6

COPY . /opt/lab

WORKDIR /opt/lab

RUN npm install