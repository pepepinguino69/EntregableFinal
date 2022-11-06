import express from "express";
import {Server} from "socket.io";
import { optionsSqlite } from "./connectionSQLite.mjs";
import { optionsMysql } from "./connectionMysql.mjs";

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
    socket.on("firstConnection", data => {
        try {
            myInstance.getAll().then((prods) => io.sockets.emit("productos", prods)); console.log("productos")
            myChatInstance.getAll().then((historicoMensajes) => {
                io.sockets.emit("historico", historicoMensajes);
			
            });
        }catch (error){console.log(error)}
        console.log("mensajes");
     
})    
    socket.emit("historico",historicoMensajes)
    socket.on("messageChat",data=>{myChatInstance.save(data);
        myChatInstance.getAll().then((historicoMensajes) => { io.sockets.emit("historico", historicoMensajes) }) 
        console.log(data);
        //historicoMensajes.push(data);
      
        //enviar a todos
        //io.sockets.emit("historico",historicoMensajes);
      
    })
  socket.on("newUser",data=>{
      console.log(data);
      myChatInstance.save(data);
      myChatInstance.getAll().then((historicoMensajes) => {
				io.sockets.emit("historico", historicoMensajes);
				
			});
      
    })
  
    socket.on("message",data=>{myInstance.save(data);
     myInstance.getAll().then((prods) => {io.sockets.emit("productos",prods);prods.push(data);io.sockets.emit("productos",prods)})
       
    })
})