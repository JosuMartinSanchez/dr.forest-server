const router = require("express").Router();

const UserModel = require("../models/User.model");

const isAuthenticated = require("../middlewares/isAuthenticated")
// POST "/api/perfil" para cargar perfil
router.get("/", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  try {
    const response = await UserModel.findById(_id);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

// PATCH "/api/perfil" para editar
router.patch("/editar", isAuthenticated, async (req, res, next) => {
  
  const { username, email, img } = req.body;
  // console.log(req.payload._id)
  try {
    await UserModel.findByIdAndUpdate(_id, {
      username,
      email,
      profilePic: img,
    });
    res.json("user updated");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
