import express from 'express';
import cors from 'cors';
import carrito from '../classes/Carrito.js';
import { authMiddleware } from '../utils.js';
const router = express.Router();
const Carrito= new carrito


router.post('/',(req,res)=>{
    carrito.addProduct().then(data=>{
        res.json(data)
    });
});

router.delete('/:id',(req,res)=>{
    carrito.deleteCarrito().then(data=>{
        res.json(data)
    });
});

router.get('/:id/productos',(req,res)=>{
    carrito.getCarrito().then(data=>{
        res.json(data)
    });
});

router.post('/:id/productos',(req,res)=>{
    carrito.addProductById(req.params.id).then(data=>{
        res.json(data)
    });
});

router.delete('/:id/productos/:id_prod',(req,res)=>{
    carrito.deleteById(req.params.id_prod).then(data=>{
        res.json(data)
    });
});

export default router;
