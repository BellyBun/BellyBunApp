import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "7QX5WDAePe";

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(204).json({ success: false, user: null });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as {
      _id: string;
      email: string;
    };

    req.user = {
      _id: decoded._id,
      email: decoded.email,
    };

    next();
    res.status(200).json({ success: true, user: decoded });
  } catch (err) {
    res.status(204).json({ success: false, user: null });
  }
}
