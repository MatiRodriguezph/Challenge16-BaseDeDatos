import { fileURLToPath } from "url";
import { dirname } from "path";

//Crear dirname para simular
const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export const authMiddleware = (req, res, next) =>{
    if(!req.auth){
        res.status(401).send({error:-2, message: 'No tienes permisos para realizar esta accion'});
    }else{
        next();
    }
}

export default __dirname;