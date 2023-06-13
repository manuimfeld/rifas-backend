const express = require("express");
const router = express.Router();
const Rifa = require("../models/Rifa"); // Ruta al archivo donde se define el modelo

//Obtener una rifa por su ID
router.get("/rifas/:idRifa", (req, res) => {
  const idRifa = req.params.idRifa;

  Rifa.findOne({ _id: idRifa })
    .then((rifa) => {
      if (!rifa) {
        return res.status(404).json({ error: "Rifa no encontrada" });
      }
      res.json(rifa);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al buscar la rifa" });
    });
});

//Crear una nueva rifa
router.post("/rifas/create", (req, res) => {
  const rifaId = req.body._id;
  const rifaTitle = req.body.title;
  const rifaDate = req.body.date;
  const rifaHour = req.body.hour;
  const rifaNumbers = req.body.numbers;

  const newRifa = new Rifa({
    _id: rifaId,
    numbers: [],
    title: rifaTitle,
    date: rifaDate,
    hour: rifaHour,
  });

  for (let i = 1; i <= rifaNumbers; i++) {
    const number = {
      number: i,
      name: ``,
      paid: false,
    };
    newRifa.numbers.push(number);
  }

  // Guarda el documento en la colección "rifas"
  newRifa
    .save()
    .then((savedRifa) => {
      console.log("Rifa agregada:", savedRifa);
      res.send("Rifa agregada correctamente");
    })
    .catch((error) => {
      console.error("Error al guardar la rifa:", error);
      res.status(500).send("Error al guardar la rifa");
    });
});

//EDITAR RIFA
router.put("/rifas/:idRifa/numeros", (req, res) => {
  const idRifa = req.params.idRifa;
  const { name, paid, number } = req.body; //Obtener la informacion enviada en el body del request

  //Buscar la rifa por su ID en mongo
  Rifa.findOne({ _id: idRifa })
    .then((rifa) => {
      if (!rifa) {
        res.status(404).json({ error: "Rifa no encontrada" });
      } else {
        if (number < 0 || number >= rifa.numbers.length + 1) {
          res.status(404).json({ error: "Índice de número no válido" });
        } else {
          rifa.numbers[number].paid = paid;
          rifa.numbers[number].name = name;
          rifa
            .save()
            .then((rifaActualizada) => {
              res.json(rifaActualizada);
            })
            .catch((error) => {
              res.status(500).json({ error: "Error al actualizar la rifa" });
            });
        }
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al actualizar la rifa" });
      return;
    });
});
module.exports = router;
