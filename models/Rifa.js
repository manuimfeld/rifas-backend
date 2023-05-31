const mongoose = require("mongoose");

const rifaSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  date: String,
  hour: String,
  numbers: [
    {
      number: Number,
      name: String,
      paid: Boolean,
    },
  ],
});

const Rifa = mongoose.model("Rifa", rifaSchema);

module.exports = Rifa;
