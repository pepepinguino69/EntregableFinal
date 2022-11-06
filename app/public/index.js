console.log("javascript funcionando");
let user;
const campoMsg = document.getElementById("messageField")

campoMsg.addEventListener("keydown",(evt)=>{
    console.log(evt.key)
    if(evt.key === "Enter"){
        let messageObj={username:user,
            message:campoMsg.value,
            timestamp:formatFecha()};
        socketClient.emit("messageChat",messageObj
            
        );campoMsg.value=""
     }
})


newUser()
const socketClient = io()
const messageContainer = document.getElementById("messageContainer");
socketClient.on("historico",(data)=>{
    let elementos="";
    data.reverse().forEach(item=>{
        elementos = elementos + `<p><strong>${item.username}</strong>:${item.message}</p>`;
    });
    messageContainer.innerHTML = elementos;
})

socketClient.on("newUser",(newUser)=>{
    Swal.fire({
        text:"nuevo usuario conectado: "+newUser,
        toast:true
    })
})


const campo = document.getElementById("form")
socketClient.emit("firstConnection",{username:"System"})  
campo.addEventListener('click',(evt)=>{evt.preventDefault();if(title.value!=""&&price.value!=""&&url.value!=""){
        const body={
          title:title.value,
          price:price.value,
          url:url.value};
          title.value="";
          price.value="" ;
          url.value=""                         
                                       

        socketClient.emit("message",body)
}})

const productContainer = document.getElementById("productContainer");
const borrar=document.getElementById("borrar");
socketClient.on("productos",(data)=>{
    let elementos=`
      <table>
        
      
      <thead>
      
    <th>ID</th>
    <th>Title</th>
    <th class="price">Price</th>
    <th class="img">Image</th>
          
  </thead>
      <tbody>`
    data.forEach(item=>{
        elementos = elementos + ` <td><a href="#">${item.id}</a></td>
      <td>${item.title}</td>
      <td class="price">${item.price}</td>
      <td class="img"><img src="${item.url}"/></td>
    </tr>`
    });
    productContainer.innerHTML = elementos;
})

socketClient.on("newUser",(newUser)=>{
    Swal.fire({
        text:"nuevo usuario conectado: "+newUser,
        toast:true
    })
})
async function newUser(){
Swal.fire({
    title:"Hola usuario",
    text:"bienvenido, ingresa tu mail",
    input:"text",
    allowOutsideClick:false
    }).then(respuesta=>{
    user = respuesta.value;
   //socketClient.emit("message",{username:"System",message:user+": se ha unido"})
   socketClient.emit("newUser",{username:"System",message:user+": se ha unido"})
  
  
  
})};


function addZero(num){
    let addString
    num<10? addString="0":addString="";
    return addString+num}

function formatFecha(){
  
  let fecha=new Date()

let ano=addZero(fecha.getFullYear());
let mes=addZero(fecha.getMonth()+1)	
let dia=addZero(fecha.getDate())
let hora=addZero(fecha.getHours())	
let minutos=addZero(fecha.getMinutes())
let segundos=addZero(fecha.getSeconds())
return dia+"/"+mes+"/"+ano+"-"+"hora"+":"+minutos+":"+segundos}

