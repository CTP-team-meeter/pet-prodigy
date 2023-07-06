FROM node:14

WORKDIR /usr/src/app

COPY ./package.json .
RUN npm install

# If you need to uninstall bcrypt and reinstall, uncomment the following lines:

# RUN npm uninstall bcrypt
RUN npm uninstall bcrypt
# RUN npm install bcrypt
RUN npm install bcrypt

COPY . .

RUN npm run build

EXPOSE 3000

CMD node ./dist/index.js
