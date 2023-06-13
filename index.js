require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const rifasRoutes = require("./routes/rifas");
const { port } = require("./config");

const app = express();

app.use(express.json()); // Parsear los datos en formato JSON
app.use(cors());

app.use("/", rifasRoutes);

// Conectar a la base de datos de MongoDB usando Mongoose
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error to connect to MongoDB");
  }
};

connectToDb();

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server listening on  port ${port}`);
});
