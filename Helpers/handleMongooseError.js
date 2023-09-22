const handleMongooseError = (error, data, next) => {
  error.status = 400;

  const status =
    error.name === "MongoServerError" && error.code === 11000 ? 409 : 400;
  error.status = status;
  next();
};

module.exports = handleMongooseError;
