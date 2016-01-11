'use strict';

// OBRA CRUD

var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

// Rutas que terminan en /obra

// POST /obra
router.post('/obra', function (req, res) {
  // bodyParser debe hacer la magia
  var autor = req.body.autor;
  var descripcion = req.body.descripcion;
  var obra = Museo.Obra.build({ autor: autor, descripcion: descripcion });

  obra.add(function (success) {
    res.json( { message: 'Obra creada!' } );
  },
	function (err) {
		res.send(err);
	});
});

// (trae todos los obras)
// GET /obra
router.get('/obra', function (req, res) {
	var obra = Museo.Obra.build();

	obra.retrieveAll(function (obras) {
		if (obras) {
			res.json(obras);
		} else {
			res.send(401, 'No se encontraron las Obras');
		}
	}, function (error) {
			res.send('Obra no encontrada');
	});
});

// Rutas que terminan en /obra/:obraId

// PUT /obra/:obraId
// Actualiza obra
router.put('/obra/:obraId', function (req, res) {
	var obra = Museo.Obra.build();
	obra.autor = req.body.autor;
  obra.descripcion = req.body.descripcion;
	obra.updateById(req.params.obraId, function (success) {
		console.log(success);
		if (success) {
			res.json({ message: 'Obra actualizada!' });
		} else {
			res.send(401, 'Obra no encontrada');
		}
	}, function (error) {
		res.send('Obra no encontrada');
	});
});

// GET /obra/:obraId
// Toma una obra por id
router.get('/obra/:obraId', function (req, res) {
	var obra = Museo.Obra.build();

	obra.retrieveById(req.params.obraId, function (obras) {
		if (obras) {
			res.json(obras);
		} else {
			res.send(401, 'Obra no encontrada');
		}
	}, function (error) {
		res.send('Obra no encontrada');
	});
});

// DELETE /obra/abraId
// Borra el obraId
router.delete('/obra/:obraId', function (req, res) {
	var obra = Museo.Obra.build();

	obra.removeById(req.params.obraId, function (obra) {
		if (obra) {
			res.json({ message: 'Obra borrada!' });
		} else {
			res.send(401, 'Obra no encontrada');
		}
	}, function (error) {
		res.send('Obra no encontrada');
	 });
});

module.exports = router;
