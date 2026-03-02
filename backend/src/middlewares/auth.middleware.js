export const verifyAdminKey = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing",
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Invalid token format",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!process.env.ADMIN_KEY) {
    return res.status(500).json({
      success: false,
      message: "ADMIN_KEY not configured",
    });
  }

  if (!token || token !== process.env.ADMIN_KEY) {
    return res.status(403).json({
      success: false,
      message: "Invalid admin key",
    });
  }

  return next();
};