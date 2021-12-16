import fs from 'fs';
import __dirname from "../utils.js";
const productURL = __dirname + "/files/events.txt";
let date = new Date();

class Modelo {
  async createEvent(event) {
    
      try {
        let data = await fs.promises.readFile(productURL, "utf-8");
        let events = JSON.parse(data);
        if (events.some((evt) => evt.title === event.title)) {
          return { status: "error", message: "El evento ya existe"};
        } else {
          let dataObject = {
            id: event.id,
            title: event.title,
            talle: event.talle,
            price: event.price,
            size: event.size,
          };
          events = [...events, dataObject];
        try {
          await fs.promises.writeFile(
            productURL,
            JSON.stringify(events, null, 2)
          );
          return { status: "ok", message: "Evento creado" };
        } catch (error) {
          return { status: "error", message: "Error al crear el producto" };
        }
      }
      } catch (err) {
        let dataObject = {
          id: event.id,
          title: event.title,
          talle: event.talle,
          price: event.price,
          size: event.size,
        };
        try {
          await fs.promises.writeFile(
            productURL,
            JSON.stringify([dataObject], null, 2)
          );
          return { status: "succes", message: "producto creado con exito" };
        } catch (error) {
          return {
            status: "error",
            message: "error al crear el producto" + error,
          };
        }
      }
    }
  
  async getById(id) {
    try {
      let data = await fs.promises.readFile("./files/events.txt", "utf-8");
      let events = JSON.parse(data);
      let event = events.find((evt) => evt.id === id);
      console.log(event);
      return { status: "succes", message: "succes al leer el archivo" };
    } catch (error) {
      return { status: "error", message: "error al leer el archivo" + error };
    }
  }

  async getAll() {
    try {
      console.log(date.getFullYear());      
      let data = await fs.promises.readFile("./files/events.txt", "utf-8");
      let events = JSON.parse(data);
      return { status: "succes", message: "productos encontrados", events };
    } catch (error) {
      return { error };
    }
  }

  async deleteAll() {
    try {
      let data = await fs.promises.readFile("./files/events.txt", "utf-8");
      let events = JSON.parse(data);
      events = [];
      try {
        await fs.promises.writeFile(
          "./files/events.txt",
          JSON.stringify(events, null, 2)
        );
        return { status: "succes", message: "exito al borrar el archivo" };
      } catch (error) {
        return { status: "error", message: "error al leer el archivo" + error };
      }
    } catch (error) {
      return { status: "error", message: "no se pudo borrar el archivo" + error };
    }
  }

  async deleteById(id) {
    try {
      let data = await fs.promises.readFile("./files/events.txt", "utf-8");
      let events = JSON.parse(data);
      let event = events.find((evt) => evt.id === id);
      if (event) {
        events = events.filter((evt) => evt.id !== id);
        try {
          await fs.promises.writeFile(
            "./files/events.txt",
            JSON.stringify(events, null, 2)
          );
          return { status: "succes", message: "succes al leer el archivo" };
        } catch (error) {
          return { status: "error", message: "error al leer el archivo" + error };
        }
      } else {
        return { status: "error", message: "no existe el evento" };
      }
    } catch (error) {
      return { status: "error", message: "error al leer el archivo" + error };
    }
  }

  async getRandom() {
    try {
      let data = await fs.promises.readFile("./files/events.txt", "utf-8");
      let events = JSON.parse(data);
      let event = events[Math.floor(Math.random() * events.length)];
      return { status: "succes", message: "succes al leer el archivo", event };
    } catch (error) {
      return { status: "error", message: "error al leer el archivo" + error };
    }
  }
}


export default Modelo;
