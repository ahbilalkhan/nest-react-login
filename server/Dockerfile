FROM node:16

WORKDIR /app

COPY package.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

COPY ./entrypoint.sh /entrypoint.sh
COPY ./wait-for-it.sh /wait-for-it.sh

RUN chmod +x /entrypoint.sh
RUN chmod +x /wait-for-it.sh
EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
