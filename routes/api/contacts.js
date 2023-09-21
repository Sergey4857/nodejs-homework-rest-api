const express = require("express");

const router = express.Router();

const controlers = require("../../controller/index");

const isValidId = require("../../middlewarees/IsValidId");
const {
  mainDataSchemsJoi,
} = require("../../service/joi-schemas/mainDataSchemsJoi");
const {
  SchemaForUpdateJoi,
} = require("../../service/joi-schemas/updateSchemaJoi");

const { validateBody } = require("../../middlewarees/validateBody");

const authenticate = require("../../middlewarees/authenticate");
// ------------------Get contacts------------------
router.get("/", authenticate, controlers.get);

// ------------------Find by ID------------------
router.get("/:contactId", authenticate, isValidId, controlers.findById);

// ------------------Add new contact------------------
router.post(
  "/",
  authenticate,
  validateBody(mainDataSchemsJoi),
  controlers.addNewContact
);

// ------------------Remove contact------------------
router.delete("/:contactId", authenticate, isValidId, controlers.deleteContact);

// ------------------Update contact------------------
router.put(
  "/:contactId",
  authenticate,
  validateBody(mainDataSchemsJoi),
  isValidId,
  controlers.updateContact
);

// ------------------UpdateFavoriteContact------------------
router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(SchemaForUpdateJoi),
  isValidId,
  controlers.updateStatusContact
);

module.exports = router;
