# Pet Prodigy
## Links
- [API Docs](https://github.com/CTP-team-meeter/pet-prodigy/blob/main/server/API_DOCS.md)
- [Scrum board](https://petprodigy.atlassian.net/jira/software/projects/PP/boards/1)
## How to setup your local
### Front-end
```
cd client
npm install
npm run dev
```
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
