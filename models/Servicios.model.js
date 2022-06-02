const { Schema, model } = require("mongoose");

const servicioSchema = new Schema({
  img: {
    type: String,
  },
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  breveDesc: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  utilidades: {
    type: String,
    required: true,
  },
});

const Servicio = model("Servicio", servicioSchema);

module.exports = Servicio;
