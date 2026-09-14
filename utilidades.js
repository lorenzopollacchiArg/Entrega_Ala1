const { input, close } = require("./nodeImperativo");

async function agregarVencimiento(){

 let diaVencimiento =parseInt(await input("\ningrese el dia de Vencimiento "),10);
  while (diaVencimiento < 1 || diaVencimiento > 31){
  diaVencimiento = parseInt(await input("\ningrese el dia de Vencimiento Valido, intente de nuevo"),10);
  }

 let mesVencimiento = parseInt(await input("\ningrese el Mes de Vencimiento:"),10);
 while ( mesVencimiento < 1 ||  mesVencimiento > 12){
   mesVencimiento =parseInt( await input("\ningrese el mes de Vencimiento Valido, intente de nuevo"),10);
}
 

 let anioVencimiento =parseInt( await input("\ningrese el anio de Vencimiento:"),10);
 while (anioVencimiento < 2026){
    anioVencimiento = parseInt(await input("\nEl anio de Vencimiento debe ser mayor a 2026 :"),10);
 }
 return new Date(anioVencimiento, mesVencimiento-1, diaVencimiento);
}


function agregarDificultad( dificultad ){
  
   if (dificultad == 1){
            dificultad = "Facil - ​🌑​ 🌕 🌕 "; 
        }
        else if (dificultad == 2) {
            dificultad = "Medio - ​🌑​​ 🌑 🌕 ​"​;
        }​
        else if (dificultad == 3 ) {
            dificultad = "Dificil - ​🌑​​ 🌑​ ​🌑 ​"
        }
   return dificultad; 
}


function agregarEstado(estado){
    if (estado == 1) {
      estado = "Pendiente"
    }
    else if (estado == 2){
        estado = "En Proceso"
    }
    else if (estado == 3){
        estado = "Completada"
    }
    else if (estado == 4){
        estado = "Cancelada"
    }
    return estado;
}

module.exports = {
    agregarDificultad , agregarVencimiento, agregarEstado 
};

