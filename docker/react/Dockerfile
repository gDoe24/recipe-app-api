FROM node:13.12.0-alpine as build

WORKDIR .

COPY package.json ./
COPY package-lock.json ./

RUN npm i -D webpack webpack-cli

RUN npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties --silent

RUN npm i react react-dom react-router-dom prop-types --silent && \
	npm i css-loader style-loader

RUN npm i redux react-redux redux-thunk redux-devtools-extension &&\
	npm i axios &&\
	npm i redux-csrf

RUN npm run dev