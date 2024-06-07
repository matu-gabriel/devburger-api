import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

const authMiddleware = (req, res, next) => {
  const tokenAuth = req.headers.authorization;

  if (!tokenAuth) {
    return res.status(401).json({ error: "Token não provido" });
  }

  const token = tokenAuth.split(" ").at(1);

  try {
    jwt.verify(token, authConfig.secretKey, (err, decoded) => {
      if (err) {
        throw new Error();
      }

      req.userId = decoded.id;
      req.userName = decoded.name;
    });
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }

  next();
};

export default authMiddleware;
