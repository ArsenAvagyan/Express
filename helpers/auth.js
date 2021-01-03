import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }

      req.user = user;
      next();
    });
  } else {
    res.status(400).send("Unauthorized");
  }
};
