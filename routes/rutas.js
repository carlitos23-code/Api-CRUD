const express = require('express');
const user = require('../user.model');
const connection = require("../conexion")
const { body, param, validationResult } = require('express-validator');
var router = express.Router()

//obtener toda una tabla
router.get('/user', [], (req, res) => {
 user.getAll(connection, (data => {
 res.json(data);
 }))
});

router.post('/Registro', [
 body('Nombre').not().isEmpty().isString(),
 body('Email').not().isEmpty().isString(),
 body('UsrName').not().isEmpty().isString(),
 body('Pswd').not().isEmpty().isString(),
 body('Role').not().isEmpty().isString(),
 body('Asignados').not().isEmpty().isString()
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
 res.json({success:false,err:JSON.stringify(errors)})
 return
 }
 let body = req.body;
 user.create(connection, body, (data => {
 res.json(data);
 }))
});

router.get('/Login/:id', [
    param('id').not().isEmpty().isNumeric(),
   ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    res.json({success:false,err:JSON.stringify(errors)})
    return
    }
    let id = req.params.id;
    user.getId(connection, id, (data => {
    res.json(data);
    }))
});

// Borrar un  usario mediante el id
router.delete('/user', [
    body('UsrID').not().isEmpty().isNumeric()
   ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    res.json({success:false,err:JSON.stringify(errors)})
    return
    }
    let body = req.body;
    user.delete(connection, body, (data => {
    res.json(data);
    }))
   });

   
//Actualizar un usario
   router.put('/user', [
    body('Nombre').not().isEmpty().isString(),
    body('Email').not().isEmpty().isString(),
    body('UsrName').not().isEmpty().isString(),
    body('Pswd').not().isEmpty().isString(),
    body('Role').not().isEmpty().isString(),
    body('Asignados').not().isEmpty().isString(),
    body('UsrID').not().isEmpty().isNumeric()
   ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    res.json({success:false,err:JSON.stringify(errors)})
    return
    }
    let body = req.body;
    user.update(connection, body, (data => {
    res.json(data);
    }))
   });

module.exports = router;