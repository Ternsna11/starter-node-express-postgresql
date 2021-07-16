const categoriesService = require("./categories.service");

function list(req, res, next) {
  categoriesService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  list,
};

// const categoriesService = require("./categories.service"); requires the service object that you created in the previous step and assigns it to categoriesService.

// You can then access the methods on the service object to perform CRUD operations on a table (for example, categoriesService.list()). Chaining then() to categoriesService.list()executes the Knex query. Chaining catch(next) onto the promise will call next() passing in the error. If the Knex promise does not have a catch(next) at the end, it will not correctly handle errors that occur during when running the query.
