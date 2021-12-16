import fs from 'fs';
import { dirname } from 'path';

let date = new Date();
let fecha = {year:date.getFullYear(),month:date.getMonth(),day:date.getDate(),
            hour:date.getHours(),minute:date.getMinutes(),second:date.getSeconds()};
console.log(date);


class carrito{

    async addProduct(number, producto){

        try{
            let data = await fs.promises.readFile('../files/carritos.json','utf-8');
        let carritos = JSON.parse(data);
        let index = carritos.findIndex(carrito => carrito.id == number);
        if(index == -1){
            return {status:false,message:'El carrito no existe'};
        }else{
            let carritoElegido = carritos[index];
            let producto = new Contenedor();
            let agregar = (await producto.getById(productoAdd.id)).message;
            agregar.stock = productoAdd.stock;
            carritoElegido.productos.push(agregar);
            let carritoNuevo = carritos.map((cart)=>{
                if(cart.id == number){
                    return carritoElegido;
                }
                return cart;
            })
            try{
                await fs.promises.writeFile('../files/carritos.json',JSON.stringify(carritoNuevo,null,2));
                return {status:"success",message: "Producto agregado al carrito"};
            }catch(err){
                return {status:"error",message: "Error al agregar el producto al carrito"};
            }
        }
        }catch(error){
            return {status:false,message: "Error al agregar producto"};
        }
    }

    async deleteCarrito(number, producto){
        try{
            let data = await fs.promises.readFile('../files/carritos.json','utf-8');
            let carritos = JSON.parse(data);
            let index = carritos.findIndex(carrito => carrito.id == number);
            if(index == -1){
                return {status:false,message:'El carrito no existe'};
            }else{
                let carritoElegido = carritos[index];
                let producto = new Contenedor();
                let eliminar = (await producto.getById(productoDelete.id)).message;
                eliminar.stock = productoDelete.stock;
                carritoElegido.productos.push(eliminar);
                let carritoNuevo = carritos.map((cart)=>{
                    if(cart.id == number){
                        return carritoElegido;
                    }
                    return cart;
                })
                try{
                    await fs.promises.writeFile('../files/carritos.json',JSON.stringify(carritoNuevo,null,2));
                    return {status:"success",message: "Producto eliminado del carrito"};
                }catch(err){
                    return {status:"error",message: "Error al eliminar el producto del carrito"};
                }
            }
        }
        catch(error){
            return {status:false,message: "Error al eliminar producto"};
        }
    }

    async getCarrito(number){
        try{
            let data = await fs.promises.readFile('../files/carritos.json','utf-8');
            let carritos = JSON.parse(data);
            let index = carritos.findIndex(carrito => carrito.id == number);
            if(index == -1){
                return {status:false,message:'El carrito no existe'};
            }else{
                let carritoElegido = carritos[index];
                return {status:"success",message: carritoElegido};
            }
        }
        catch(error){
            return {status:false,message: "Error al obtener el carrito"};
        }
    }

    async addProductById(number, producto){
        try{
            let data = await fs.promises.readFile('../files/carritos.json','utf-8');
            let carritos = JSON.parse(data);
            let index = carritos.findIndex(carrito => carrito.id == number);
            if(index == -1){
                return {status:false,message:'El carrito no existe'};
            }else{
                let carritoElegido = carritos[index];
                let producto = new Contenedor();
                let agregar = (await producto.getById(productoAdd.id)).message;
                agregar.stock = productoAdd.stock;
                carritoElegido.productos.push(agregar);
                let carritoNuevo = carritos.map((cart)=>{
                    if(cart.id == number){
                        return carritoElegido;
                    }
                    return cart;
                })
                try{
                    await fs.promises.writeFile('../files/carritos.json',JSON.stringify(carritoNuevo,null,2));
                    return {status:"success",message: "Producto agregado al carrito"};
                }catch(err){
                    return {status:"error",message: "Error al agregar el producto al carrito"};
                }
            }
        }
        catch(error){
            return {status:false,message: "Error al agregar producto"};
        }
    }

    async deleteById(number, producto){
        try{
            let data = await fs.promises.readFile('../files/carritos.json','utf-8');
            let carritos = JSON.parse(data);
            let index = carritos.findIndex(carrito => carrito.id == number);
            if(index == -1){
                return {status:false,message:'El carrito no existe'};
            }else{
                let carritoElegido = carritos[index];
                let producto = new Contenedor();
                let eliminar = (await producto.getById(productoDelete.id)).message;
                eliminar.stock = productoDelete.stock;
                carritoElegido.productos.push(eliminar);
                let carritoNuevo = carritos.map((cart)=>{
                    if(cart.id == number){
                        return carritoElegido;
                    }
                    return cart;
                })
                try{
                    await fs.promises.writeFile('../files/carritos.json',JSON.stringify(carritoNuevo,null,2));
                    return {status:"success",message: "Producto eliminado del carrito"};
                }catch(err){
                    return {status:"error",message: "Error al eliminar el producto del carrito"};
                }
            }
        }
        catch(error){
            return {status:false,message: "Error al eliminar producto"};
        }
    }
}
//     async getAllCarritos(){
//         let data = await fs.promises.readFile('../files/carritos.json','utf-8');
//         let carritos = JSON.parse(data);
//         return carritos;
//     }
//     async deletById(id){
//         let data = await fs.promises.readFile('../files/carritos.json','utf-8');
//         let carritos = JSON.parse(data);
//         let index = carritos.findIndex(carrito => carrito.id == id);
//         if(index == -1){
//             return {status:false,message:'El carrito no existe'};
//         }else{
//             let carritoNuevo = carritos.map((cart)=>{
//                 if(cart.id == id){
//                     return null;
//                 }
//                 return cart;
//             })
//             await fs.promises.writeFile('../files/carritos.json',JSON.stringify(carritoNuevo,null,2));
//             return {status:"success",message: "Carrito eliminado"};
//         }
//     }
//     async addProductByid(id, producto){
//         let data = await fs.promises.readFile('../files/carritos.json','utf-8');
//         let carritos = JSON.parse(data);
//         let index = carritos.findIndex(carrito => carrito.id == id);
//         if(index == -1){
//             return {status:false,message:'El carrito no existe'};
//         }else{
//             let carritoElegido = carritos[index];
//             let producto = new Contenedor();
//             let agregar = (await producto.getById(productoAdd.id)).message;
//             agregar.stock = productoAdd.stock;
//             carritoElegido.productos.push(agregar);
//             let carritoNuevo = carritos.map((cart)=>{
//                 if(cart.id == id){
//                     return carritoElegido;
//                 }
//                 return cart;
//             })
//             await fs.promises.writeFile('../files/carritos.json',JSON.stringify(carritoNuevo,null,2));
//             return {status:"success",message: "Producto agregado al carrito"};
//         }
//     }

// }
export default carrito;