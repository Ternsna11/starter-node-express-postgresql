// Update with your config settings.
const path = require("path")
require("dotenv").config();
const { DATABASE_URL } =process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations" ),
    }
  },
};
// require("dotenv").config(); requires and loads dotenv into the application code. Dotenv loads the environment variables that you defined in .env (which currently only contains DATABASE_URL) into process.env.

// const { DATABASE_URL } = process.env; stores the value of process.env.DATABASE_URL in a variable called DATABASE_URL.

// connection: DATABASE_URL, sets the location of the database for the development environment to DATABASE_URL (which is currently the URL for your ElephantSQL database instance).

// Setting directory: path.join(__dirname, "src", "db", "migrations") within the migrations object will tell Knex to store migration files in the migrations folder at src/db/migrations