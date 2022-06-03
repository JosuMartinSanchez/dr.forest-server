const router = require("express").Router();
const ServicioModel = require("../models/Servicios.model.js");

//! GET "/api/servicios" => Lista todos los servicios disponibles

router.get("/servicios,", async (req, res, next) => {
  try {
    const response = await ServicioModel.find().select("title");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//! POST "/api/servicios" => Crear servicios
router.get("/servicios,", async (req, res, next) => {
  const { img, nombre, breveDesc, descripcion, utilidades } = req.body;
  //Campos a rellenar al crear un servicio
  if (!img || !nombre || !breveDesc || !descripcion || !utilidades) {
    res.status(400).json("Todos los campos deben ser rellenados");
  }
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

//! GET "/api/servicios/:id" => Lista los detalles del servicios.

router.get("/servicios:id,", async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await ServicioModel.findById(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//! DEL "/api/servicios:id" => Elimina un servicio
router.delete("/servicios:id,", async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await ServicioModel.findByIdAndDelete(id);
    res.json("El servicio ha sido eliminado");
  } catch (error) {
    next(error);
  }
});

//! PATCH "/api/servicios/:id" => Lista todos los servicios disponibles
router.delete("/servicios:id,", async (req, res, next) => {
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
