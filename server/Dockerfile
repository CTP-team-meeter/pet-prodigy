FROM node
WORKDIR /usr/src/app
COPY ./package.json .
RUN npm install
# RUN npm uninstall bcrypt
# RUN npm install bcrypt
COPY . .
RUN npm run build
EXPOSE 8080
CMD node ./dist/index.js
