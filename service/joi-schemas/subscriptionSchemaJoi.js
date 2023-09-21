const Joi = require("joi");

const SomeMyEnum = {
  starter: "starter",
  pro: "pro",
  business: "business",
};

const subscriptionSchemaJoi = Joi.object({
  subscription: Joi.string()
    .required()
    .valid(...Object.values(SomeMyEnum)),
});

module.exports = { subscriptionSchemaJoi };
