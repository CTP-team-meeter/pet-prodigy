FROM node

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

EXPOSE 8080

CMD node ./dist/index.js
