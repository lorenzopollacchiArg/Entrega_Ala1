const { agregarEstado } = require("./utilidades");

class Tarea {
    constructor( titulo = "Sin titulo", descripcion = "Sin descripcion ", estado = "Sin estado", dificultad = "Sin dificultad", fechaVencimiento = null){
      
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.dificultad = dificultad;
        this.estado = estado;
        this.fechaCreacion = new Date();
        this.fechaUltimaEdicion = null; 
        this.fechaVencimiento = fechaVencimiento; 
    }
}  

module.exports = Tarea;