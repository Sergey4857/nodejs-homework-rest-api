const Joi = require("joi");

const schemaForUpdateJoi = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { schemaForUpdateJoi };
