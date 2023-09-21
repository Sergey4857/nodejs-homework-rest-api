const { validateBody } = require("../../middlewarees/validateBody");
const express = require("express");
const router = express.Router();
const { registerJoiSchema } = require("../../service/joi-schemas/registerJoi");
const { loginJoi } = require("../../service/joi-schemas/loginJoi");
const {
  subscriptionSchemaJoi,
} = require("../../service/joi-schemas/subscriptionSchemaJoi");
const {
  register,
  login,
  getCurrent,
  logout,
  subscription,
} = require("../../controller/auth");
const authenticate = require("../../middlewarees/authenticate");

router.post("/users/register", validateBody(registerJoiSchema), register);

router.post("/users/login", validateBody(loginJoi), login);

router.get("/users/current", authenticate, getCurrent);

router.post("/users/logout", authenticate, logout);

router.patch(
  "/users",
  authenticate,
  validateBody(subscriptionSchemaJoi),
  subscription
);

module.exports = router;
