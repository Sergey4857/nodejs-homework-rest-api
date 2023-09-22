const Joi = require("joi");

const SubscriptionTypes = {
  starter: "starter",
  pro: "pro",
  business: "business",
};

const subscriptionSchemaJoi = Joi.object({
  subscription: Joi.string()
    .required()
    .valid(...Object.values(SubscriptionTypes)),
});

module.exports = { subscriptionSchemaJoi };
