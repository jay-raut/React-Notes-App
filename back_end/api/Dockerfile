FROM node
RUN mkdir -p /api
RUN mkdir -p /Certs
WORKDIR /api

COPY package*.json /api

RUN npm install

COPY . /api

COPY .env /api

EXPOSE 4000

CMD [ "node", "api_handler.js" ]