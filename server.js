import express from "express";
import {Server} from "socket.io";
import { optionsSqlite } from "./connectionSQLite.mjs";
import { optionsMysql } from "./connectionMysql2.mjs";

import knex from "knex"
const databaseMysql = knex(optionsMysql);
const databaseSqlite = knex(optionsSqlite);
const app = express();
console.log(optionsMysql)
const PORT = process.env.PORT || 8080;
//
//servidor de express
const server = app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));
//
//servidor de websocket y lo conectamos con el servidor de express
const io = new Server(server);
import  {Contenedor}  from './ContenedorDB.js'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const myInstance = new Contenedor('productos',databaseMysql,"productos",optionsMysql);
const myChatInstance = new Contenedor('chat',databaseSqlite,"chat",optionsSqlite);
//
app.use(express.static(__dirname+"/public"));
myInstance.init(databaseMysql,'mySql');
myChatInstance.init(databaseSqlite,'Sqlite');
const historicoMensajes = [];

io.on("connection",(socket)=>{
    socket.on("firstConnection",data=>{
     try{console.log("1st try") ;myInstance.getAll().then((prods) => io.sockets.emit("productos",prods));console.log("productos")}catch (error){console.log(error)} 
    myChatInstance.getAll().then((historicoMensajes) => {
			io.sockets.emit("historico", historicoMensajes);
			
		});
        console.log("mensajes");
     
})   
    socket.emit("historico",historicoMensajes)
    try{socket.on("messageChat",data=>{myChatInstance.save(data);
     myChatInstance.getAll().then((historicoMensajes) => {io.sockets.emit("historico",historicoMensajes);})
       
        console.log(data);
        //historicoMensajes.push(data);
      
        //enviar a todos
        //io.sockets.emit("historico",historicoMensajes);
      
    })}catch (error){console.log(error)}
  socket.on("newUser",data=>{
      console.log(data);data.timestamp=formatFecha();
      myChatInstance.save(data);
      myChatInstance.getAll().then((historicoMensajes) => {
				io.sockets.emit("historico", historicoMensajes);
				
			});
        historicoMensajes.push(data);
        //enviar a todos
        io.sockets.emit("historico",historicoMensajes);
    })
  
    socket.on("message",data=>{myInstance.save(data);
     myInstance.getAll().then((prods) => {io.sockets.emit("productos",prods);prods.push(data);io.sockets.emit("productos",prods)})
       
    })
})
function formatFecha(){
  
  let fecha=new Date()

let ano=addZero(fecha.getFullYear());
let mes=addZero(fecha.getMonth()+1)	
let dia=addZero(fecha.getDate())
let hora=addZero(fecha.getHours())	
let minutos=addZero(fecha.getMinutes())
let segundos=addZero(fecha.getSeconds())
return dia+"/"+mes+"/"+ano+"-"+hora+":"+minutos+":"+segundos}

function addZero(num){
    let addString
    num<10? addString="0":addString="";
    return addString+num}
