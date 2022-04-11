FROM node:16-alpine
ENV PORT 4000

WORKDIR /app
VOLUME /app/uploads

COPY package*.json /app/
RUN apk --no-cache add curl && npm install

COPY . /app
RUN npm run build


EXPOSE $PORT

CMD [ "npm", "run", "start:prod"]