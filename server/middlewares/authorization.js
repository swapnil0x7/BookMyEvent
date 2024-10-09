const authorizedRoles = (...allowedUsers) => (req, res, next) => {
  try {
    const role = req.user.role;

    if (!allowedUsers.includes(role)) {
      return res.status(403).send({
        status: false,
        message: "User is not authorised.",
      });
    }
    next();
  } catch (error) {
    res.status(403).send(err);
  }
};

export default authorizedRoles;