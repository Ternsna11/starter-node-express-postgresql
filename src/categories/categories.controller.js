const categoriesService = require("./categories.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(res, next) {
  const data = await categoriesService.list();
  res.json({ data });
}
// The categoriesService.list() function executes a Knex query, which is an asynchronous operation. Using the await keyword before categoriesService.list() forces the execution of the code to pause on that line until that asynchronous operation is finished. Once it is, the resolved response is stored in categories. Because the list() function contains a function that uses await, you must add the async keyword in front of the list() function. Otherwise, your code won't work properly.

module.exports = {
  list: asyncErrorBoundary(list),
};

// function list(req, res, next) {
//   categoriesService
//     .list()
//     .then((data) => res.json({ data }))
//     .catch(next);
// }
// const categoriesService = require("./categories.service"); requires the service object that you created in the previous step and assigns it to categoriesService.

// You can then access the methods on the service object to perform CRUD operations on a table (for example, categoriesService.list()). Chaining then() to categoriesService.list()executes the Knex query. Chaining catch(next) onto the promise will call next() passing in the error. If the Knex promise does not have a catch(next) at the end, it will not correctly handle errors that occur during when running the query.
