import jwt from "jsonwebtoken";
import { appconfig } from "../config/appconfig.js";

export const checkAuth = (req, res) => {
  const token = req.cookies.accessToken; // This will get the httpOnly cookie

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  // res.status(200).json({ message: "Authenticated" });

  // Verify token
  jwt.verify(token, appconfig.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.log(err.message);

      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // If token is valid, send a success response
    res.status(200).json({ message: "Authenticated", user: decoded });
  });
};
