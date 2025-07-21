const adminAuth = (req, res, next) => {
  const { name, password } = req.headers;

  if (name === "laiba421" && password === "12345678") {
    return next();
  }

  return res.status(401).json({ error: "Unauthorized" });
};

module.exports = adminAuth;
