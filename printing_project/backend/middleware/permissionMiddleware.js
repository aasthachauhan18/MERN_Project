export const checkPermission = (permission) => {
  return (req, res, next) => {
    const userPermissions =
      req.user?.roleRef?.permissions || [];

    if (!userPermissions.includes(permission)) {
      return res.status(403).json({
        message: "Permission Denied",
      });
    }

    next();
  };
};