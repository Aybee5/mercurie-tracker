module.exports.auth = (req, res, next) => {
  if (req.headers.token === process.env.AUTH_TOKEN) {
    next();
  } else {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};
