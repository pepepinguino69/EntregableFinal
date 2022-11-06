const app = express();

const PORT = process.env.PORT || 8080;

//servidor de express
const server = app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

//servidor de websocket y lo conectamos con el servidor de express
const io = new Server(server);
const  Contenedor  = require('./ContenedorDB.js').Contenedor
const myInstance = new Contenedor("sql10530656","productos",optionsMysql);
const myChatInstance = new Contenedor("chat","chat",optionsSqlite);

app.use(express.static(__dirname+"/public"));

const historicoMensajes = [];

io.on("connection",(socket)=>{
    socket.on("firstConnection",data=>{
      myInstance.getAll().then((prods) => io.sockets.emit("productos",prods));
      myChatInstance.getAll().then((msgs) => {io.sockets.emit("historico",historicoMensajes);historicoMensajes.push(msgs);io.sockets.emit("historico",historicoMensajes)})
     
})    
    socket.emit("historico",historicoMensajes)
    socket.on("messageChat",data=>{myChatInstance.save(data);
     myChatInstance.getAll().then((prods) => {io.sockets.emit("historico",historicoMensajes);historicoMensajes.push(data);io.sockets.emit("historico",historicoMensajes)})
       
        console.log(data);
        //historicoMensajes.push(data);
      
        //enviar a todos
        //io.sockets.emit("historico",historicoMensajes);
      
    })
  socket.on("newUser",data=>{
        console.log(data);
        historicoMensajes.push(data);
        //enviar a todos
        io.sockets.emit("historico",historicoMensajes);
    })
  
    socket.on("message",data=>{myInstance.save(data);
     myInstance.getAll().then((prods) => {io.sockets.emit("productos",prods);prods.push(data);io.sockets.emit("productos",prods)})
       
    })
})