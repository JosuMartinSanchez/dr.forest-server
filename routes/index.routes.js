const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//*--------------- Rutas auth-------------------------
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

//*--------------- Rutas servicios-------------------------

const serviciosRoutes = require("./servicios.routes");
router.use("/servicios", serviciosRoutes);

//*--------------- Rutas presupuesto-------------------------

const presupuestoRoutes = require("./presupuesto.routes");
router.use("/presupuestos", presupuestoRoutes);


//*--------------- Rutas Perfil-------------------------

const profileRoutes = require("./profile.routes");
router.use("/perfil", profileRoutes);



module.exports = router;
