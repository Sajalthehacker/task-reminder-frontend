FROM node:18-alpine
WORKDIR /task-frontend/

COPY public/ /task-frontend/public
COPY src/ /task-frontend/src
COPY package.json /task-frontend/

ENV REACT_APP_SERVER="http://localhost:5000"
EXPOSE 3000

RUN npm install
CMD ["npm", "start"]