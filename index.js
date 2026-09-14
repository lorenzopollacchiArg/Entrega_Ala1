const { agregarTarea, verTareaspendientes, verTareasproceso, verTareascompletadas, verTareascanceladas, buscarTarea } = require("./gestorTarea");
const { input, close } = require("./nodeImperativo");
const {menuPrincipal,menuVertareas}= require("./mostrarMenus")



const Tarea = require("./tarea");

async function main( ){
 let salir = false; 
  while(!salir){
    const opcionMenu = await menuPrincipal();
    switch (opcionMenu){
      case 0:
        salir = true; 
      break 

      case 1:
        const opMenuverTareas = await menuVertareas();
        switch (opMenuverTareas){
          case 0:
            
          break

          case 1:
            await verTareaspendientes();
          break;

          case 2:
            await verTareasproceso();
          break; 

          case 3:
            await verTareascompletadas();
          break;

          case 4:
            await verTareascanceladas(); 
          break; 
          default: console.log(`ingrese una respuesta valida`);
        }
      break;

      case 2: 
        await agregarTarea();
      break; 

      case 3: 
      await buscarTarea();
      
    }
  }
   close(); 
}

main();