import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  return jwt.sign(
    {
      userId: id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
};

export const generateAdminToken = (id) => {
  return jwt.sign(
    {
      adminId: id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const getUserDataFromToken = (token) => {
  if (token) {
      console.log(token)
    const userData = verifyToken(token);
    if (userData) return userData;
  }

  return {};
};