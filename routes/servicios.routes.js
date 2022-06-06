const router = require("express").Router();
const isProfesional = require("../middlewares/isProfesional.js");
const ServicioModel = require("../models/Servicios.model.js");

//! GET "/api/servicios" => Lista todos los servicios disponibles

router.get("/", async (req, res, next) => {
  try {
    const response = await ServicioModel.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//! POST "/api/servicios" => Crear servicios
router.post("/", isProfesional, async (req, res, next) => {
  const { img, nombre, breveDesc, descripcion, utilidades } = req.body.form;
  //Campos a rellenar al crear un servicio
  if (!img || !nombre || !breveDesc || !descripcion || !utilidades) {
    res.status(400).json("Todos los campos deben ser rellenados");
  }

  console.log(req.body);

  try {
    const response = await ServicioModel.create({
      img,
      nombre,
      breveDesc,
      descripcion,
      utilidades,
    });

    res.json(response);
  } catch (error) {
    next(error);
  }
});

//! GET "/api/servicios/:id" => Detalles del servicio.

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await ServicioModel.findById(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//! DEL "/api/servicios:id" => Elimina un servicio
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await ServicioModel.findByIdAndDelete(id);
    res.json("El servicio ha sido eliminado");
  } catch (error) {
    next(error);
  }
});

//! PATCH "/api/servicios/:id" => Editar los servicios
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { img, nombre, breveDesc, descripcion, utilidades } = req.body;
  //Campos a rellenar al modificigar un servicio
  if (!img || !nombre || !breveDesc || !descripcion || !utilidades) {
    res.status(400).json("Todos los campos deben ser rellenados");
  }

  try {
    const response = await ServicioModel.findByIdAndUpdate(id, {
      img,
      nombre,
      breveDesc,
      descripcion,
      utilidades,
    });
    res.json("El servicio ha sido modificado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
