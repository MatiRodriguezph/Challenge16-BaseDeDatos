
export default class Container{
    constructor(database,table){
        this.database=database;
        this.table=table;
        if(this.table==='productos'){
        this.database.schema.hasTable('producto').then(result =>{
            if (!result){//si no existe la tabla
                this.database.schema.createTable('producto', table => {
                    table.increments('id').primary();
                    table.string('name_producto').notNullable();
                    table.string('description_producto').notNullable();
                    table.string('codigo_producto').notNullable();
                    table.string('foto_producto').notNullable();
                    table.integer('precio_producto').notNullable();
                    table.integer('stock_producto').notNullable();
                    table.timestamps(true, true);
                }).then(() => {
                    console.log('Tabla creada');
                }).catch(error => {
                    console.log('Error al crear la tabla', error);
                });
             }
        })}else if (this.table==='chats'){
            this.database.schema.hasTable('chats').then(result=>{
                if(!result){
                    this.database.schema.createTable('chats', table => {
                        table.increments('id');
                        table.string('mensaje');
                        table.string('email');
                        table.timestamps(true, true);
                    }).then(()=>{
                        console.log('Tabla creada');
                    }).catch(error=>{
                        console.log('Error al crear la tabla',error);
                    })
                }
            })
        }
        
    }
    getAll = async () => {
        try{
            let productos = await database.select().table('producto');
        return { status: "success", message: "productos encontrados", productos };
        }catch(error){
            return {status: "error", message:error};
        }
        
    }
    
    getProductoById = async (id)=>{
        try{
            let producto = await database.select().table('producto').where('id',id).first();
            if (producto){
                return {status: "success", message: "producto encontrado", producto};
            }else{
                return {status: "error", message: "producto no encontrado"};
            }
        }catch(error){

        }
    }
    createProducto = async (producto) => {
        try{
            let exists = await database.table('producto').select().where('name_producto',producto.name_producto).first();
            if (exists) return {status: "error", message: "producto ya existe"};
            let result = await database.table('producto').insert(producto);
            return {status: "success", message: "producto creado con exito", result};
        }catch(error){
            return {status: "error", message: "error al crear el producto"};
        }
    }
    deleteProducto = async (id) => {
        try{
            let result = await database.table('producto').where('id',id).del();
            return {status: "success", message: "producto eliminado con exito", result};
        }catch(error){
            return {status: "error", message: "error al eliminar el producto"};
        }
    }
    deleteAllProductos = async () => {
        try{
            let result = await database.table('producto').del();
            return {status: "success", message: "productos eliminados con exito", result};
        }catch(error){
            return {status: "error", message: "error al eliminar los productos"};
        }
    }
    updateProducto = async (id,producto) => {
        try{
            let result = await database.table('producto').where('id',id).update(producto);
            return {status: "success", message: "producto actualizado con exito", result};
        }catch(error){
            return {status: "error", message: "error al actualizar el producto"};
        }
    }
    getMessages = async () => {
        try{
            let messages = await database.select().table('chats');
            return {status: "success", message: "mensajes encontrados", messages};
        }catch(error){
            return {status: "error", message: "error al obtener los mensajes"};
        }
    }
    addMessage = async (message) => {
        try{
            let result = await database.table('chats').insert(message);
            return {status: "success", message: "mensaje agregado con exito", result};
        }catch(error){
            return {status: "error", message: "error al agregar el mensaje"};
        }
    }

}