FROM node:latest

ARG USER_ID=1000
ENV USER_ID=${USER_ID}

ARG GROUP_ID=1000
ENV GROUP_ID=${GROUP_ID}

WORKDIR /usr/src/service

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN groupmod -g ${GROUP_ID} node && usermod -u ${USER_ID} --gid ${GROUP_ID} node 
USER node