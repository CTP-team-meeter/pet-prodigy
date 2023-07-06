FROM node:18
WORKDIR /usr/src/app
COPY ./package.json . 
RUN npm install
COPY . .
ENV VITE_BACKEND_HOST=http://0.0.0.0:3000
ENV VITE_GOOGLE_MAPS_API_KEY=AIzaSyAFJ2BCFxLkb4eJDRwz_oVN01msMbqnNKo
RUN npm run build
EXPOSE 5173
CMD npm run preview
