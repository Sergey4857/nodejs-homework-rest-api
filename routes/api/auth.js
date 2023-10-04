const { validateBody } = require("../../middlewarees/validateBody");

const express = require("express");
const router = express.Router();
const { registerJoiSchema } = require("../../service/joi-schemas/registerJoi");
const { loginJoi } = require("../../service/joi-schemas/loginJoi");
const { emailSchema } = require("../../service/joi-schemas/emailSchema");
const upload = require("../../middlewarees/upload");
const {
  subscriptionSchemaJoi,
} = require("../../service/joi-schemas/subscriptionSchemaJoi");
const {
  register,
  login,
  getCurrent,
  logout,
  subscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controller/auth");
const authenticate = require("../../middlewarees/authenticate");

router.post("/users/register", validateBody(registerJoiSchema), register);

router.get("/users/verify/:verificationToken", verifyEmail);

router.post("/users/verify", validateBody(emailSchema), resendVerifyEmail);

router.post("/users/login", validateBody(loginJoi), login);

router.get("/users/current", authenticate, getCurrent);

router.post("/users/logout", authenticate, logout);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

router.patch(
  "/users",
  authenticate,
  validateBody(subscriptionSchemaJoi),
  subscription
);

module.exports = router;
