const { validateBody } = require("../../middlewarees/validateBody");
const express = require("express");
const router = express.Router();
const { registerJoiSchema } = require("../../service/joi-schemas/registerJoi");
const { loginJoi } = require("../../service/joi-schemas/loginJoi");
const {
  subscriptionSchemaJoi,
} = require("../../service/joi-schemas/subscriptionSchemaJoi");
const ctrl = require("../../controller/auth");
const authenticate = require("../../middlewarees/authenticate");

// ---------------------register------------------------

router.post("/users/register", validateBody(registerJoiSchema), ctrl.register);

// ---------------------login--------------------------
router.post("/users/login", validateBody(loginJoi), ctrl.login);

// ---------------------current------------------------
router.get("/users/current", authenticate, ctrl.getCurrent);

// ---------------------logout------------------------
router.post("/users/logout", authenticate, ctrl.logout);

// ---------------UpdateSubscriptionContact-------------
router.patch(
  "/users",
  authenticate,
  validateBody(subscriptionSchemaJoi),
  ctrl.subscription
);

module.exports = router;
