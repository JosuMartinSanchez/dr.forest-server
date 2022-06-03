const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    img: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["cliente", "profesional"],
    },
    telf: {
      type: Number,
    },
    cp: {
      type: Number,      
    },
    pais: {
      type: String,
    },
    provincia: {
      type: String,
    },
    poblacion: {
      type: String,
    },
    calle: {
      type: String,
    },
    numero: {
      type: Number,
    },
    piso: {
      type: String,
    },
    cif: {
      type: String,

      
    },

    rSocial: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
