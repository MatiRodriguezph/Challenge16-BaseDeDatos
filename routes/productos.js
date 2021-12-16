import express from 'express';
import cors from 'cors';
import Modelo from '../classes/Manager.js';
import { authMiddleware } from '../utils.js';
import Container from '../services/container.js';
import { database } from '../config.js';


const router = express.Router();
const manager = new Modelo();
const productosService = new Container(database, 'productos');

router.get('/', (req, res) => {
    productosService.getAll().then(result => {
        res.send(result);
    });
});

router.get('/:id', (req, res) => {
    productosService.getProductoById(id).then(result => {
        res.send(result);
    });
});

router.post('/', authMiddleware,(req, res) => {
    let producto = req.body;
    productosService.createProducto(producto).then(result => {
        res.send(result);
    });
});

router.put('/:id',authMiddleware, (req, res) => {
    let producto = req.body;
    productosService.updateProducto(producto).then(result => {
        res.send(result);
    });
});

router.delete('/:id', authMiddleware,(req, res) => {
    productosService.deleteProducto(id).then(result => {
        res.send(result);
    });
});

export default router;