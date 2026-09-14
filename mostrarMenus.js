
const { input, close } = require("./nodeImperativo");

async function menuPrincipal() {
  let opcionMenu
   console.log ("\n -- Gestor de tareas --");
   opcionMenu = parseInt(await input(" \nBienvenido/a , Ingrese una opcion: 1- Ver Tareas 2- Agregar una Tarea 3- Buscar una Tarea 0- Salir "),10);
   while (opcionMenu < 0 || opcionMenu > 3){
     opcionMenu = parseInt(await input("\nIngrese una opcion correcta: 1- Ver Tareas 2- Agregar una Tarea 3- Buscar una Tarea 0- Salir "),10);
   }
   return opcionMenu; 
 }

   async function menuVertareas(){
    let opMenuverTareas;
    console.log("\nIngrese una opcion para continuar"); 
    opMenuverTareas = parseInt(await input("\n1- Ver Tareas Pendientes  | 2- Ver Tareas En Proceso | 3- Ver Tareas Completadas | 4- Ver Tareas Canceladas | 0- salir "),10);
    while (opMenuverTareas < 0 || opMenuverTareas > 4){
        opMenuverTareas = parseInt(await input(" \nIngrese un valor valido: 1- Ver Tareas Pendientes  | 2- Ver Tareas En Proceso | 3- Ver Tareas Completadas | 4- Ver Tareas Canceladas | 0- salir "),10);
    }
    return opMenuverTareas;
  }


  module.exports = {
    menuPrincipal, menuVertareas 
};
 