FROM node:18
WORKDIR /usr/src/app
COPY ./package.json . 
RUN npm install
COPY . .
ENV VITE_BACKEND_HOST="http://192.210.197.116/"
RUN npm run build
EXPOSE 5173
CMD npm run preview
