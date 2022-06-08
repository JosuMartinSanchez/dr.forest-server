const router = require("express").Router();

const UserModel = require("../models/User.model");

const isAuthenticated = require("../middlewares/isAuthenticated");
// POST "/api/perfil" para cargar perfil
router.get("/", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  try {
    const response = await UserModel.findById(_id);
    res.json(response);
    console.log(response);
  } catch (err) {
    next(err);
  }
});

// PATCH "/api/perfil" para editar
router.patch("/editarPerfil", isAuthenticated, async (req, res, next) => {
  const { username, email } = req.body;
  const { _id } = req.payload;
  console.log(req.body);
  console.log(req.payload);
  const stringBody = JSON.stringify(username);
  console.log(stringBody);
  try {
    const response = UserModel.findByIdAndUpdate(_id, {
      username: stringBody,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
