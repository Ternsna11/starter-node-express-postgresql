const supplierService = require("./suppliers.service");

//require the suppliers service object at the top of suppliers.controller.js
const hasProperties = require("../errors/hasProperties");
const suppliersService = require("./suppliers.service");
const hasRequiredProperties = hasProperties("supplier_name", "supplier_email");

async function supplierExist(req, res, next) {
  const supplier = await suppliersService.read(req.params.supplierId);
  if (supplier) {
    res.locals.supplier = supplier;
    return next();
  }
  next({ status: 404, message: `Supplier cannot be found.` });
}

async function create(res, req, next) {
  const data = await supplierService.create(req.params.data);
  res.status(201).json({ data });
}

async function update(req, res, next) {
  const updatedSupplier = {
    ...req.body.data,
    supplier_id: res.locals.supplier.supplier_id,
  };
  const data = await supplierService.update(updatedSupplier);
  res.json({ data })
}

async function destroy(req, res) {
  const { supplier } = res.locals;
  await suppliersService.delete(supplier.supplier_id);
  res.sendStatus(204);
}

// array of our valid properties we would want to check against
const VALID_PROPERTIES = [
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_notes",
  "supplier_type_of_goods",
];
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

module.exports = {
  create: [hasOnlyValidProperties, hasRequiredProperties, create],
  update: [
    supplierExists,
    hasOnlyValidProperties,
    hasRequiredProperties,
    update,
  ],
  delete: [supplierExists, destroy],
};

//  - - - - - - -  .then() method of promise chaining below - - - - - - - 
// function create(req, res, next) {
//   supplierService
//     .create(req.body.data)
//     .then((data) => res.status(201).json({ data }))
//     .catch(next);
// }

//The function above calls the suppliersService.create() method, passing in req.body.data as the argument. The req.body.data argument references the object containing the supplier information. Chaining then() to suppliersService.create() executes the Knex query. If the promise resolves successfully, the server responds with a 201 status code along with the newly created supplier.

// function supplierExists(req, res, next) {
//   suppliersService
//     .read(req.params.supplierId)
//     .then((supplier) => {
//       if (supplier) {
//         res.locals.supplier = supplier;
//         return next();
//       }
//       next({ status: 404, message: `Supplier cannot be found.` });
//     })
//     .catch(next);
//   }
// //Chaining then() to suppliersService.read() will execute the Knex query that you defined previously to retrieve a supplier given based on ID. The query returns a promise, which is handled in the then() function. If the supplier exists, it is stored in res.locals.supplier so that it can be readily accessed in the rest of the middleware pipeline. Otherwise, next() is called with an error object.

// function update(req, res, next) {
//   const updatedSupplier = {
//     ...req.body.data,
//     supplier_id: res.locals.supplier.supplier_id,
//   };
//   suppliersService
//     .update(updatedSupplier)
//     .then((data) => res.json({ data }))
//     .catch(next);
// }

//The function above calls the SuppliersService.update() method, passing in the updatedSupplier object. Note that the supplier_id of updatedSupplier is always set to the existing supplier_id (res.locals.supplier.supplier_id) to prevent the update from accidentally, or intentionally, changing the supplier_id during an update. If the promise resolves successfully, then the server responds with the updated supplier.

// function destroy(req, res, next) {
//   supplierService
//     .delete(res.locals.supplier.supplier_id)
//     .then(() => res.sendStatus(204))
//     .catch(next);
// }

//The function above calls the suppliersService.delete() method, passing in the supplier_id of the supplier to be deleted as an argument. If the promise resolves successfully, the server responds with a 204 status code.

// async function create(req, res, next) {
//   res.status(201).json({ data: { supplier_name: "new supplier" } });
// }

// async function update(req, res, next) {
//   res.json({ data: { supplier_name: "updated supplier" } });
// }

// async function destroy(req, res, next) {
//   res.sendStatus(204);
// }


