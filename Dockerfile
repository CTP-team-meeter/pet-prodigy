FROM node:18
WORKDIR /home/node/app
COPY server /home/node/app/
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt
CMD npm run dev
EXPOSE 9999
