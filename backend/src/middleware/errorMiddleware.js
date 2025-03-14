//! Number 5: handles errors 

const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`.red.underline);

  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { errorHandler };

// Todo: server > intialise express > load routes > start server