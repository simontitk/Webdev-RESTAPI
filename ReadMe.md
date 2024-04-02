# Architectures and Frameworks for the Web
## Mini project 2

### Setup
Clone the repository.

Run the command `npm install` in the directory where the repository was cloned.

To start the server use the `npm start` command

To start the server in dev mode use the `npm run devstart` command
> **Note:** devstart starts the server with nodemon, which automatically restarts the server when it detects a change in the source files.

### Database
We are using SQLite database for our db.

To reset the database use these commands:

`npx prisma migrate reset --force`

`node prisma/seed.js`
