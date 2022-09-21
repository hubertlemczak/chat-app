const errorHandler = (err, req, res, next) => {
  console.log('error', err);
  next();
};

module.exports = errorHandler;
