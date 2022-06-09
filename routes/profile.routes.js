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
  const {
    email,
    username,
    telf,
    cp,
    pais,
    provincia,
    poblacion,
    calle,
    numero,
    piso,
    cif,
    rSocial,
  } = req.body;
  const { _id } = req.payload;
  console.log(req.body);
  try {
    await UserModel.findByIdAndUpdate(
      _id,
      {
        email,
        username,
        telf,
        cp,
        pais,
        provincia,
        poblacion,
        calle,
        numero,
        piso,
        cif,
        rSocial,
      },
      { new: true }
    ),
      res.json("Usuario actualizado correctamente");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
