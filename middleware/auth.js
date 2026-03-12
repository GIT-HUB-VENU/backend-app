const authenticateAdmin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized. Please login." });
  }
};

export { authenticateAdmin };