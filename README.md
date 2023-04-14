# Pet Prodigy
## Links
- [Live Demo](http://www.petprodigy.us)👈
- [API Docs](https://github.com/CTP-team-meeter/pet-prodigy/blob/main/server/API_DOCS.md)
- [Scrum board](https://petprodigy.atlassian.net/jira/software/projects/PP/boards/1)

## How to setup your local
### Prerequisite
Install [node](https://nodejs.org/en/download) 18.x
### Front-end
```
cd client
cp .env_template .env
npm install
npm run dev
```
Client accepts the following environment variables:
- `VITE_GOOGLE_MAPS_API_KEY` to enable Google Maps API
- `VITE_BACKEND_HOST` to specify the base URL for the backend server API
### Database
- Install MongoDB following the instruction 
https://www.mongodb.com/docs/manual/administration/install-community/
- Connect to your db server on MongoDB Compass or Mongosh
- Create a Datebase called `pet_prodigy`
### Back-end
```
cd server
cp .env_template .env
npm install
npm run dev
```
Server accepts the following environment variables:
- `DATABASE_URL` to specify the URL for the MongoDB database.
- `PORT` to specify which port for the server run on. Default: 8080
- `TOKEN_SECRET` to encrypt JWT
- `SALT` is used for password hashing using bcrypt
- `CAT_API_KEY` to use access the Cat API
- `DOG_API_KEY` to use access the Dog API

## Deployment
To deploy the application, we use a CI/CD pipeline that automatically builds and deploys Docker images for the frontend and backend on every push to the main branch of the GitHub repository. Here's an overview of the deployment process:
1. A push to the main branch triggers a GitHub action that builds the Docker images for the frontend and backend.
2. The Docker images are tagged with the latest tag and pushed to Docker Hub.
3.On the server, we use Watchtower to automatically pull the latest Docker images from Docker Hub and restart the containers. This ensures that the application is always up-to-date and running the latest code.
4. We use Nginx as a reverse proxy to forward incoming requests to the appropriate container. 

The Nginx configuration file used on the server is different from the one in this repository. If you need to update the Nginx configuration, you'll need to make changes to the configuration file in the separate repository.
