const { Schema, model } = require("mongoose");

const presupuestoSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  provincia: {
    type: String,
    required: true,
  },
  poblacion: {
    type: String,
    required: true,
  },
  calle: {
    type: String,
    required: true,
  },
  numero: {
    type: Number,
    required: true,
  },
  piso: {
    type: String,
    required: true,
  },

  observaciones: {
    type: String,
  },
  numEmpleados: {
    type: Number,
  },
  metro2: {
    type: Number,
  },
  precio: {
    type: Number,
  },
  servicioId: {
    // Relación con el servicio
    type: Schema.Types.ObjectId,
    ref: "Servicio",
  },
  estado: {
    type: String,
    enum: ["⏳", "✔️", "❌"],
    default: "⏳",
  },
  userId: {
    // Relación con el usuario
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  profesionalId: {
    type: Schema.Types.ObjectId,
    ref: "Servicio",
  },
});

const Presupuesto = model("Presupuesto", presupuestoSchema);

module.exports = Presupuesto;
