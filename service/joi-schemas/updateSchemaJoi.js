const Joi = require("joi");

const SchemaForUpdateJoi = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { SchemaForUpdateJoi };
