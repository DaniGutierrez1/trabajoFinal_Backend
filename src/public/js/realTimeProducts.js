const socketClient = io();

const tituloProducto= document.getElementById("tituloProducto")
const descripcionProducto=document.getElementById("descripcionProducto")
const sendButton=document.getElementById("sendButton");

sendButton.addEventListener("click",()=>{
    socketClient.emit("creacionTitulo",tituloProducto.value);
    tituloProducto.value="";
/*     socketClient.emit("creacionDescripcion",descripcionProducto.value);
    descripcionProducto.value=""; */
})



socketClient.on("historialProductos",(products)=>{
    console.log(products)
})
