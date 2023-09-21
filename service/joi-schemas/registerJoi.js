const Joi = require("joi");

const emailValidate = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const registerJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailValidate).required(),
  password: Joi.string().min(6).required(),
});

module.exports = { registerJoiSchema };
