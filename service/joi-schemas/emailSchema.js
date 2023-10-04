const Joi = require("joi");
const emailValidate = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailValidate).required(),
});

module.exports = { emailSchema };
