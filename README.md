# Pet Prodigy
## Links
- [API Docs](https://github.com/CTP-team-meeter/pet-prodigy/blob/main/server/API_DOCS.md)
- [Scrum board](https://petprodigy.atlassian.net/jira/software/projects/PP/boards/1)
## How to setup your local
### Front-end
```
cd client
cp .env_template .env
npm install
npm run dev
```
Client accepts the following environment variables:
- `VITE_GOOGLE_MAPS_API_KEY` to enable Google Maps API
#### Environment variavle
### Database
- Install mongoDB following the instruction 
https://www.mongodb.com/docs/manual/administration/install-community/
- Connect to your db server on MongoDB Compass or Mongosh
- Create Datebase `pet_prodigy`
### Back-end
```
cd server
cp .env_template .env
npm install
npm run dev
```
Server accepts the following environment variables:
- `DATABASE_URL` The URL for MongoDB database
- `PORT` to choose which port for the application. Default: 8080
- `TOKEN_SECRET` to encrypt JWT
- `SALT` is used for password hashing by bcrypt
- `CAT_API_KEY` to use Cat API
- `DOG_API_KEY` to use Dog API
