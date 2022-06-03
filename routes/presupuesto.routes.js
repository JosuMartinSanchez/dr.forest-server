const router = require("express").Router();
const PresupuestoModel = require("../models/Presupuesto.model.js");

//! GET "/api/presupuesto" => Lista todos los presupuestos disponibles

router.get("/", async (req, res, next) => {
  try {
    const response = await PresupuestoModel.find().select("userId");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//! POST "/api/presupuesto" => Crear presupuesto
router.get("/", async (req, res, next) => {
  const {
    fecha,
    direction,
    pais,
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
  //Campos a rellenar al crear un presupuesto
  if (
    !fecha ||
    !direction ||
    !pais ||
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
  try {
    const response = await PresupuestoModel.create({
      fecha,
      direction,
      pais,
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
    });

    res.json(response);
  } catch (error) {
    next(error);
  }
});

//! GET "/api/presupuestos/:id" => Lista los detalles del presupuesto.

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await PresupuestoModel.findById(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//! DEL "/api/presupuestos:id" => Elimina un presupuesto
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await PresupuestoModel.findByIdAndDelete(id);
    res.json("El presupuesto ha sido eliminado");
  } catch (error) {
    next(error);
  }
});

//! PATCH "/api/presupuestos/:id" => Editar el presupuesto
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const {
    fecha,
    direction,
    pais,
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
    !direction ||
    !pais ||
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

  try {
    const response = await PresupuestoModel.findByIdAndUpdate(id, {
      fecha,
      direction,
      pais,
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
    });
    res.json("El presupuesto ha sido modificado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
