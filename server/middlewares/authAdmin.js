module.exports.authAdmin = (req, res, next) => {
  if (req.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      ok: false,
      msg: "Usuario no tiene el rol de administrador",
    });
  }
};
