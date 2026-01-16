export const onlyAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN" && req.user.role !== "SUPER_ADMIN") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};
