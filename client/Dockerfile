FROM node:18
WORKDIR /usr/src/app
COPY ./package.json . 
RUN npm install
COPY . .
ENV VITE_BACKEND_HOST="http://localhost"
RUN npm run build
EXPOSE 5173
CMD npm run preview
