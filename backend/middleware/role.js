// This middleware assumes the `protect` middleware has already run and attached the user to the request object.
const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: You do not have the required role." });
    }
    next();
  };
};

export default checkRole;