
const socket = io();
// eventos de socket //

socket.on('updateProductos',data=>{
    let productos = data.events;
    fetch('../views/prodTable').then(string=>string.text()).then(template=>{
        const processedTemplate = Handlebars.compile(template);
        const templateObject = {
            productos:productos
        }
        const html = processedTemplate(templateObject);
        let div = document.getElementById('productos');
        div.innerHTML= html;
    });
});

socket.on('updateProductos',data=>{
    let productos = data.events;
    fetch('../views/prodTable').then(string=>string.text()).then(template=>{
        const processedTemplate = Handlebars.compile(template);
        const templateObject = {
            productos:productos
        }
        const html = processedTemplate(templateObject);
        let div = document.getElementById('prodTable');
        div.innerHTML= html;
    });
});

//Enviar formulario//
document.addEventListener('submit',enviarFormulario);


function enviarFormulario(event){
    console.log("hola producto"); // borrar console.log
    event.preventDefault();
    let formulario = document.getElementById('prodForm');
    let data = new FormData(formulario);
    let id = data.get('id');
    let title = data.get('title');
    let talle = data.get('talle');
    let size = data.get('size');
    let price = data.get('price');
    let image = data.get('image');
    let req = {
        id:id,
        title: title,
        talle: talle,
        size: size,
        price: price,
        image: image,
    }
    fetch('/api/productos',{
        method: 'POST',
        body: JSON.stringify(req),
        headers: {"Content-Type": "application/json"}
    }).then(result => { 
        console.log(result);
       return result.json();
    }).then(json=>{
        console.log(json);
        Swal.fire({
            title: 'Producto creado',
            text: 'El producto se ha creado correctamente',
            icon: 'success',
            timer:2000,
    }).then(result=>{
        console.log(result);
        location.href = '/';
    })
    console.log("estoy en el final");
});
}

document.getElementById("image").onChange = (e)=>{
    let read = new FileReader();
    read.onload = e =>{
        document.querySelector('.image-text').innerHTML = "¡Qué hermoso!"
        document.getElementById("preview").src = e.target.result;
    }
    
    read.readAsDataURL(e.target.files[0])
}


// Mensajeria // 

let input = document.getElementById('mensaje');
let user = document.getElementById('user');
let date = new Date ();
let fecha = {year:date.getFullYear(),month:date.getMonth(),day:date.getDate(),hour:date.getHours(),minute:date.getMinutes(),second:date.getSeconds()};
console.log(date);



let enviarMensaje = document.getElementById('form-chat-personas');
enviarMensaje.addEventListener('submit', (event) => {
    console.log(this)
    event.preventDefault();
    if(input.value){
        socket.emit('messages', {user:user.value,message:input.value});
    }
    //si no hay mensaje no se envia//
    else{
        console.log('No enviado');
    }
});



socket.on('welcome',data=>{
   alert(data);
});
socket.on('messages',data=>{
    let p = document.getElementById('log');
    let mensajes = data.map(message=>{
        return `<div id="container-chat"><span style= "color:blue">${message.user} </span>
        <span style= "color:red"> ${fecha.day} - ${fecha.month} - ${fecha.year} 
        //  ${fecha.hour}:${fecha.minute}:${fecha.second} </span> dice: 
        <span style= "color:green">${message.message}</span></div>`
    }).join('');
    p.innerHTML=mensajes;
});