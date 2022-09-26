const errorHandler = (err, req, res, next) => {
  console.error('[error]', err);
  next();
};

module.exports = errorHandler;
