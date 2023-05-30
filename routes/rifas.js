const express = require("express");
const router = express.Router();
const Rifas = require("../models/Rifas"); // Ruta al archivo donde se define el modelo

// Define las rutas
router.get("/:id", (req, res) => {
  const idRifa = req.params.id;

  Rifas.findOne({ _id: idRifa })
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

//CREAR UNA NUEVA RIFA
router.post("/create", (req, res) => {
  const id = req.body._id;

  const newRifa = new Rifas({
    _id: id,
    numeros: [],
  });

  for (let i = 1; i <= 100; i++) {
    const numero = {
      numero: i,
      nombre: ``,
      estado_pago: false,
    };

    newRifa.numeros.push(numero);
  }

  // Guarda el documento en la colección "rifas"
  newRifa
    .save()
    .then((savedRifa) => {
      console.log("Rifa agregada:", savedRifa);
      // Realiza las operaciones que necesites con el documento guardado
      res.send("Rifa agregada correctamente");
    })
    .catch((error) => {
      console.error("Error al guardar la rifa:", error);
      res.status(500).send("Error al guardar la rifa");
    });
});

//EDITAR RIFA
router.put("/:idRifa/numeros/:idNumero", (req, res) => {
  const idRifa = req.params.idRifa;
  const idNumero = req.params.idNumero;
  //Obtener la informacion enviada en el body del request
  const { nombre, estado_pago } = req.body;

  //Buscar la rifa por su ID en mongo
  Rifas.findOne({ _id: idRifa })
    .then((rifa) => {
      if (!rifa) {
        res.status(404).json({ error: "Rifa no encontrada" });
      } else {
        if (idNumero < 0 || idNumero >= rifa.numeros.length + 1) {
          res.status(404).json({ error: "Índice de número no válido" });
        } else {
          rifa.numeros[idNumero - 1].estado_pago = estado_pago;
          rifa.numeros[idNumero - 1].nombre = nombre;
          rifa
            .save()
            .then((rifaActualizada) => {
              res.json(rifaActualizada);
            })
            .catch((error) => {});
        }
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al actualizar la rifa" });
      return;
    });
});

// Exporta el router para usarlo en otros archivos
module.exports = router;
