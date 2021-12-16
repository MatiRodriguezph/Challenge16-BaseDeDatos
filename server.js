//Server express con metodos

import express from 'express';
import cors from 'cors'; 
import Modelo from './classes/Manager.js';
import carrito from './classes/Carrito.js';
import prodRouter from './routes/productos.js';
import carritoRouter from './routes/carrito.js';
import {engine} from 'express-handlebars';
import fs from 'fs';
import {Server} from 'socket.io';
import { authMiddleware } from './utils.js';
import multer from 'multer';
import Container from './services/container.js';
import {chats} from './config.js';

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`);
});
const io = new Server(server);
const manager = new Modelo();
const Carrito = new carrito();
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '/public');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

//booleano para el admin //
const admin = true;

//middlewares//

//motor de plantillas //

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((req ,res,next)=>{
    console.log(new Date().toTimeString().split("")[0], req.method, req.url);
    req.auth = admin;
    next();
})
app.use(express.static('public'));
app.use(cors());
app.use('/api/productos',prodRouter);
app.use('/api/carrito',carritoRouter);


app.post('/api/uploadfile',upload.single(),(req,res)=>{
    const files = req.file;
    if (!files||files.length===0) {
        res.status(500).send({message:'No se subio el archivo'});
        return;}
    });

app.get('/views/carritoCompras',(req,res)=>{
    carrito.getAll().then(result=>{
        console.log(result.carritos)
        let obj = {
            carritos:result.carritos
        }
    })
    res.render('carritoCompras',obj)
})




app.get('/views/productos',authMiddleware,(req,res)=>{
    manager.getAll().then(result=>{
        console.log(result.events)
        let obj = {
            eventos:result.events
        }
        res.render('productos',obj)
    })
})

app.get('/views/prodTable',(req,res)=>{
    manager.getAll().then(result=>{
        console.log(result.events)
        let obj = {
            eventos:result.events
        }
        res.render('prodTable',obj)
    })
})

const container = new Container(chats,'chats');


io.on('connection',socket=>{
    console.log(`El socket ${socket.id} se ha conectado`);
    container.getMessages().then(result=>{
        if(result.status==='success'){
            io.emit('messages',result.messages);
        }
    });
    


    socket.on('messages',data=>{
        container.addMessage(data).then(result=>{
            if(result.status==='success'){
                io.emit('messages',result.result);
            }
        });
    });
});
