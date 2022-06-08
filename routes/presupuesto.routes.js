const router = require("express").Router();
const PresupuestoModel = require("../models/Presupuesto.model.js");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const ServicioModel = require("../models/Servicios.model.js");

//! GET "/api/presupuesto" => Lista todos los presupuestos disponibles

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const response = await PresupuestoModel.find({
      userId: req.payload._id,
    })
      .populate("userId")
      .populate("servicioId");

    //El populate es de como se llama la propiedad
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//! GET "/api/presupuesto/empresa" => Lista todos los presupuestos vinculados a esa empresa

router.get("/empresa", isAuthenticated, async (req, res, next) => {
  try {
    const response = await PresupuestoModel.find({
      profesionalId: req.payload._id,
    })
      .populate("userId")
      .populate("servicioId");
    //El populate es de como se llama la propiedad
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//! POST "/api/presupuesto" => Crear presupuestos
router.post("/:id", isAuthenticated, async (req, res, next) => {
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
    userId,
    profesionalId,
  } = req.body;

  //Campos a rellenar al crear un presupuesto
  if (
    !fecha ||
    !provincia ||
    !poblacion ||
    !calle ||
    !numero ||
    !piso ||
    !observaciones
  ) {
    res.status(400).json("Todos los campos deben ser rellenados");
    return;
  }

  if (!numEmpleados || !metro2) {
    res
      .status(400)
      .json("El valor de Nº de empleados y Metros cuadrados no puede ser 0");
    return;
  }

  try {
    const response2 = await ServicioModel.findById(id).select("idCreador");
    const responseIdCreador = response2.idCreador;

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
      profesionalId: responseIdCreador,
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
    const response = await PresupuestoModel.findById(id).populate("userId");

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
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { userType } = req.payload;

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
    estado,
  } = req.body;
  console.log(req.body);

  // Campos a rellenar al modificar un presupuesto

  if (userType === "profesional" && (!estado || !precio)) {
    res.status(400).json("Todos los campos deben ser rellenados");
  }

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
      estado,
      precio,
      servicioId,
    });
    console.log(response);
    res.json("El presupuesto ha sido modificado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
