const mongoose = require("mongoose");

const rifasSchema = new mongoose.Schema({
  _id: Number,
  titulo: String,
  fecha: String,
  horario: String,
  numeros: [
    {
      numero: Number,
      nombre: String,
      estado_pago: Boolean,
    },
  ],
});

const Rifas = mongoose.model("Rifas", rifasSchema);

module.exports = Rifas;
