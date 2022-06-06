const router = require("express").Router();
const PresupuestoModel = require("../models/Presupuesto.model.js");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated.js");

//! GET "/api/presupuestos" => Lista todos los presupuestos disponibles

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const response = await PresupuestoModel.findById(req.payload._id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//! POST "/api/presupuesto" => Crear presupuestos
router.post("/", isAuthenticated, async (req, res, next) => {
  const {
    fecha,

    provincia,
    poblacion,
    calle,
    numero,
    piso,
    observaciones,
    numEmpleados,
    metro2,
    precio,
    servicioId,
    userId,
  } = req.body;

  console.log(req.body);
  //Campos a rellenar al crear un presupuesto
  if (
    !fecha ||
    !provincia ||
    !poblacion ||
    !calle ||
    !numero ||
    !piso ||
    !observaciones ||
    !numEmpleados ||
    !metro2
  ) {
    res.status(400).json("Todos los campos deben ser rellenados");
    return;
  }
  try {
    const response = await PresupuestoModel.create({
      fecha,

      provincia,
      poblacion,
      calle,
      numero,
      piso,
      observaciones,
      numEmpleados,
      metro2,
      precio,
      userId: req.payload._id,
      servicioId,
    });

    console.log(response);
    console.log(req.payload._id);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

//! GET "/api/presupuestos/:id" => Lista los detalles del presupuestos.

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await PresupuestoModel.findById(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//! DEL "/api/presupuestos:id" => Elimina un presupuestos
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await PresupuestoModel.findByIdAndDelete(id);
    res.json("El presupuesto ha sido eliminado");
  } catch (error) {
    next(error);
  }
});

//! PATCH "/api/presupuestos/:id" => Editar el presupuestos
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const {
    fecha,

    provincia,
    poblacion,
    calle,
    numero,
    piso,
    observaciones,
    numEmpleados,
    metro2,
    precio,
    servicioId,
  } = req.body;
  //Campos a rellenar al modificar un presupuesto
  if (
    !fecha ||
    !provincia ||
    !poblacion ||
    !calle ||
    !numero ||
    !piso ||
    !observaciones ||
    !numEmpleados ||
    !metro2 ||
    !precio ||
    !servicioId
  ) {
    res.status(400).json("Todos los campos deben ser rellenados");
  }
  console.log(req.payload);
  try {
    const response = await PresupuestoModel.findByIdAndUpdate(id, {
      fecha,

      provincia,
      poblacion,
      calle,
      numero,
      piso,
      observaciones,
      numEmpleados,
      metro2,
      precio,
      servicioId,
      userId,
    });
    res.json("El presupuesto ha sido modificado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
