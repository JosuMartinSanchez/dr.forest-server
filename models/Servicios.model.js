const { Schema, model } = require("mongoose");

const servicioSchema = new Schema({
  img: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
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
  idCreador: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Servicio = model("Servicio", servicioSchema);

module.exports = Servicio;
