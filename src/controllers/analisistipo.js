'use strict';

// ANALISISTIPO CRUD

var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

// Rutas que terminan en /analisistipo

// POST /analisistipo
router.post('/analisistipo', function (req, res) {
  // bodyParser debe hacer la magia
  var tipo = req.body.tipo;
  var subtipo = req.body.subtipo;
  var predeterminado = req.body.predeterminado;
  var analisistipo = Museo.AnalisisTipo.build({ tipo: tipo, subtipo: subtipo ,predeterminado: predeterminado });


  analisistipo.add(function (success) {
    res.json( { message: 'Tipo de analisis creada!' } );
  },
	function (err) {
		res.send(err);
	});
});

// (trae todos los obras)
// GET /analisistipo
router.get('/analisistipo', function (req, res) {
	var analisistipo = Museo.AnalisisTipo.build();

	analisistipo.retrieveAll(function (analisistipos) {
		if (analisistipos) {
			res.json(analisistipos);
		} else {
			res.send(401, 'No se encontraron los tipos de analisis');
		}
		}, function (error) {
			res.send('Analisis tipo no encontrada');
	});
});

// Rutas que terminan en /analisistipo/:analisistipoid

// PUT /analisistipo/:analisistipoId
// Actualiza analisistipo
router.put('/analisistipo/:analisistipoId', function (req, res) {
	var analisistipo = Museo.AnalisisTipo.build();
	analisistipo.tipo = req.body.tipo;
  analisistipo.subtipo = req.body.subtipo;
	analisistipo.updateById(req.params.analisistipoId, function (success) {
		console.log(success);
		if (success) {
			res.json({ message: 'Tipo analisis actualizada!' });
		} else {
			res.send(401, 'tipo analisis no encontrada');
		}
	}, function (error) {
		res.send('tipo analisis no encontrada');
	});
});

// GET /analisistipo/:analisistipoId
// Toma una analisistipo por id
router.get('/AnalisisTipo/:analisistipoId', function (req, res) {
	var analisistipo = Museo.AnalisisTipo.build();

	analisistipo.retrieveById(req.params.analisistipoId, function (analisistipo) {
		if (analisistipo) {
			res.json(analisistipo);
		} else {
			res.send(401, 'analisistipo no encontrada');
		}
	}, function (error) {
		res.send('analisistipo no encontrada');
	});
});

// DELETE /analisistipo/analisistipoId
// Borra el analisistipoId
router.delete('/analisistipo/:analisistipoId', function (req, res) {
	var analisistipo = Museo.AnalisisTipo.build();

	analisistipo.removeById(req.params.analisistipoId, function (analisistipo) {
		if (analisistipo) {
			res.json({ message: 'analisistipo borrada!' });
		} else {
			res.send(401, 'analisistipo no encontrada');
		}
	}, function (error) {
		res.send('analisistipo no encontrada');
	 });
});

module.exports = router;
