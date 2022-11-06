// server.js
//const express = require("express");
//const  Contenedor  = require('../Contenedor.js').Contenedor
//const productRouter = express.Router();

//const myInstance = new Contenedor("/.productos.txt");


//module.exports = productRouter

const express = require("express");
const Contenedor = require("../Contenedor").Contenedor
const productsRouter = express.Router();
console.log(Contenedor)

const myInstance = new Contenedor("productos.txt");

productsRouter.get("/",(req,res)=>myInstance.getAll().then((data) => res.json(data)))
productsRouter.delete('/:xx', (req, res) => {const { xx } = req.params;myInstance.deleteById(xx).then((data) => res.send(data))});
productsRouter.put(':xx', (req, res) => {const { xx } = req.params;myInstance.putById(xx,req.body).then ((data)=> res.send('modificado'))})
productsRouter.get('/:xx',  (req, res) => {const { xx } = req.params;myInstance.getById(xx).then((data) => res.json(data))})
productsRouter.post('/', function(req, res){myInstance.save(req.body)    .then((data) => myInstance.getById(req.body.id).then((data) => res.render('card',{id:data.id,price:data.price,title:data.title,img:data.url})))});


module.exports = productsRouter;