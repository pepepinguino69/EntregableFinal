// server.js
const express = require("express");
const  Contenedor  = require("../Contenedor.js").Contenedor
const productRouter = express.Router();

const myInstance = new Contenedor("/productos.txt");


productRouter.get("/",(req,res)=>{res.send("peticion recibida desde router produyctos")})
productRouter.delete('/api/productos/:xx', (req, res) => {const { xx } = req.params;myInstance.deleteById(xx).then((data) => res.send(data))});
productRouter.put('/api/productos/:xx', (req, res) => {const { xx } = req.params;myInstance.putById(xx,req.body).then ((data)=> res.send('modificado'))})
productRouter.get('/api/productos/:xx',  (req, res) => {const { xx } = req.params;myInstance.getById(xx).then((data) => res.json({id:data.id,price:data.price,title:data.title,url:data.url}))})
productRouter.post('/api/productos/', function(req, res){myInstance.save(req.body)    .then((data) => myInstance.getById(req.body.id).then((data) => res.render('card',{id:data.id,price:data.price,title:data.title,img:data.url})))});

const port = 8080;
productRouter.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

productRouter.get("/home",(req,res)=>{
    res.send("peticion home")})

module.exports = productRouter
