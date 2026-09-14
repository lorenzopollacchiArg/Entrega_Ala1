const { input } = require("./nodeImperativo");
const Tarea = require("./tarea");
const {agregarDificultad,agregarEstado,agregarVencimiento }= require("./utilidades");

const tareas = []; 
async function agregarTarea() { 
 let continuar,contadorTareas = 0 ; 
    do{
        const titulo = await input("\nIngrese el titulo de la tarea");

        const descripcion = await input("\ningrese la descripcion de la tarea");

        let dificultad = parseInt(await input("\ningrese la dificultad de la tarea: 1- Facil / 2- Media / 3- Dificil"),10);
        while (dificultad < 1 || dificultad > 3){
            dificultad = parseInt(await input("\ningrese la dificultad correcta: 1- Facil / 2- Media / 3- Dificil"),10);
        }
       const dificultadTexto = agregarDificultad(dificultad);

       const estado = parseInt(await input("\ningrese el estado de la tarea: 1- Pendiente 2- En Proceso 3- Completada 4- Cancelada"),10);;
       while (estado <1 || estado > 4) {
        estado = parseInt(await input(" \nINTENTE DE NUEVO: ingrese el estado de la tarea: 1- Pendiente 2- En Proceso 3- Completada 4- Cancelada"),10);
       }
       const estadoTexto = agregarEstado(estado);

       const fechaCreacion = new Date();

       console.log("\nIngrese la fecha de vencimiento");
       const fechaVencimiento = await agregarVencimiento();

       const nuevaTarea = new Tarea(titulo,descripcion,estadoTexto,dificultadTexto,fechaVencimiento,fechaCreacion);
       contadorTareas++;

       tareas.push(nuevaTarea);

       console.log("\n¡Tarea guardada exitosamente!");

       continuar = await input("\nDesea agregar otra tarea? 1- Si 2- No");
    
       while (continuar < 1 || continuar > 2){
         continuar = await input("\nINTENTE DE NUEVO: Desea agregar otra tarea? 1- Si 2- No");
        }

     } while (continuar == 1);
}


// funciones para ver las tareas 
async function verTareascompletadas(){
  const completadas = []; 

  for(let i = 0; i <tareas.length; i++){
    if(tareas[i].estado == "Completada"){
      completadas.push(tareas[i]); 
    }
  }

  if (completadas.length == 0){
    console.log(`\nNo hay tareas completadas`);
    return;
  }
  let continuar; 
  do{
    for(let i = 0; completadas.length; i++){
      console.log(`${i+1 } - Titulo: ${completadas[i].titulo}`)
    }    

    let seleccion = parseInt(await input(`\ningrese el numero de la tarea para ver la informacion`),10);
    while (seleccion < 1 || seleccion > completadas.length){
      seleccion = parseInt(await input(`\nIntente de nuevo: ingrese el numero de la tarea para ver la informacion`),10);
    }

    const tareaElegida = completadas[seleccion -1 ];

    console.log(`\nTitulo: ${tareaElegida.titulo}`);
    console.log(`\nDescripcion: ${tareaElegida.descripcion}`);
    console.log(`\nEstado ${tareaElegida.estado}`);
    console.log(`\nDificultad ${tareaElegida.dificultad}`);
    console.log(`\nFecha de creacion: ${tareaElegida.fechaCreacion}`);
    console.log(`\nFecha de vencimiento ${tareaElegida.fechaVencimiento}`);

    console.log("Que desea realizar?");
  let opcionRealizar = parseInt(await input ("1-Editar Tarea | 2- Ver otra tarea | 3- Salir"),10);
  while(opcionRealizar < 1 || opcionRealizar > 3){
    opcionRealizar = parseInt(await input ("1-Editar Tarea | 2- Ver otra tarea | 3- Salir"),10);
  }
   if (opcionRealizar == 1){
       await editarTareas(tareaElegida);
       let seguir = parseInt(await input("\n¿Desea ver otra tarea? 1- Si | 2- Salir: "), 10);
       if (seguir !== 1){
         continuar = 2
       }

   } else if(opcionRealizar ==2){
     continuar = 1

   }else if(opcionRealizar==3){
    continuar = 2
   }
  }while(continuar==1);
}

async function verTareasproceso(){
  const enProceso = []; 

  for(let i = 0; i < enProceso.length; i++){
    if(tareas[i].estado == "En Proceso"){
      enProceso.push(tareas[i]); 
    }
  }

  if (enProceso.length == 0){
    console.log(`No hay tareas en proceso`);
    return; 
  }
    let continuar; 
  do{
    for(let i = 0; enProceso.length; i++){
      console.log(`${i +1} - Titulo: ${enProceso[i].titulo}`)
    }    

    let seleccion = parseInt(await input(`\ningrese el numero de la tarea para ver la informacion`),10);
    while (seleccion < 1|| seleccion > enProceso.length){
      seleccion = parseInt(await input(`\nIntente de nuevo: ingrese el numero de la tarea para ver la informacion`),10);
    }

    const tareaElegida = enProceso[seleccion -1 ];

    console.log(`Titulo: ${tareaElegida.titulo}`);
    console.log(`Descripcion: ${tareaElegida.descripcion}`);
    console.log(`Estado ${tareaElegida.estado}`);
    console.log(`Dificultad ${tareaElegida.dificultad}`);
    console.log(`Fecha de creacion: ${tareaElegida.fechaCreacion}`);
    console.log(`Fecha de vencimiento ${tareaElegida.fechaVencimiento}`);

   console.log("Que desea realizar?");
  let opcionRealizar = parseInt(await input ("1-Editar Tarea | 2- Ver otra tarea | 3- Salir"),10);
  while(opcionRealizar < 1 || opcionRealizar > 3){
    opcionRealizar = parseInt(await input ("1-Editar Tarea | 2- Ver otra tarea | 3- Salir"),10);
  }
   if (opcionRealizar == 1){
       await editarTareas(tareaElegida);
       let seguir = parseInt(await input("\n¿Desea ver otra tarea? 1- Si | 2- Salir: "), 10);
       if (seguir !== 1){
         continuar = 2
       }

   } else if(opcionRealizar ==2){
     continuar = 1

   }else if(opcionRealizar==3){
    continuar = 2
   }

  }while(continuar==1);
}



async function verTareaspendientes(){
   const pendientes = [];
    
  for (let i = 0; i < tareas.length;i++){
    if (tareas[i].estado == "Pendiente"){
       pendientes.push(tareas[i]);
    }

  }
  if (pendientes.length == 0){
    console.log(`No hay tareas pendientes`);
    return;
  }
  let continuar; 
  do{
    for(let i = 0; i <pendientes.length;i++){
      console.log(`${i+1} - Titulo: ${pendientes[i].titulo}`)
    }
  let seleccion = parseInt(await input(`ingrese el numero de la tarea para ver la infomacion`),10);
  while (seleccion < 1|| seleccion > pendientes.length){
    seleccion = parseInt(await input(`ingrese el numero de la tarea para ver la infomacion`),10);
  }

  const tareaElegida = pendientes[seleccion - 1 ];


  console.log(`Titulo: ${tareaElegida.titulo}`);
  console.log(`Descripcion: ${tareaElegida.descripcion}`);
  console.log(`Estado: ${tareaElegida.estado}`);
  console.log(`Dificultad: ${tareaElegida.dificultad}`);
  console.log(`Fecha de creacion: ${tareaElegida.fechaCreacion}`);
  console.log(`Fecha de vencimineto: ${tareaElegida.fechaVencimiento}`);

  console.log("Que desea realizar?");
  let opcionRealizar = parseInt(await input ("1-Editar Tarea | 2- Ver otra tarea | 3- Salir"),10);
  while(opcionRealizar < 1 || opcionRealizar > 3){
    opcionRealizar = parseInt(await input ("1-Editar Tarea | 2- Ver otra tarea | 3- Salir"),10);
  }
   if (opcionRealizar == 1){
       await editarTareas(tareaElegida);
       let seguir = parseInt(await input("\n¿Desea ver otra tarea? 1- Si | 2- Salir: "), 10);
       if (seguir !== 1){
         continuar = 2
       }

   } else if(opcionRealizar ==2){
     continuar = 1

   }else if(opcionRealizar==3){
    continuar = 2
   }
  
  }while(continuar == 1); 
}

async function verTareascanceladas(){
  const canceladas = []; 

  for(let i = 0; i < canceladas.length; i++){
    if(tareas[i].estado == "Cancelada"){
      canceladas.push(tareas[i]); 
    }
  }

  if (canceladas.length == 0){
    console.log(`No hay tareas canceladas`);
    return; 
  }
  let continuar; 
  do{
    for(let i = 0; canceladas.length; i++){
      console.log(`${i +1 } - Titulo: ${canceladas[i].titulo}`)
    }    

    let seleccion = parseInt(await input(`ingrese el numero de la tarea para ver la informacion`),10);
    while (seleccion < 1|| seleccion > canceladas.length){
      seleccion = parseInt(await input(`Intente de nuevo: ingrese el numero de la tarea para ver la informacion`),10);
    }

    const tareaElegida = canceladas[seleccion -1 ];

    console.log(`Titulo: ${tareaElegida.titulo}`);
    console.log(`Descripcion: ${tareaElegida.descripcion}`);
    console.log(`Estado ${tareaElegida.estado}`);
    console.log(`Dificultad ${tareaElegida.dificultad}`);
    console.log(`Fecha de creacion: ${tareaElegida.fechaCreacion}`);
    console.log(`Fecha de vencimiento ${tareaElegida.fechaVencimiento}`);
    console.log("Que desea realizar?");
  let opcionRealizar = parseInt(await input ("1-Editar Tarea | 2- Ver otra tarea | 3- Salir"),10);
  while(opcionRealizar < 1 || opcionRealizar > 3){
    opcionRealizar = parseInt(await input ("1-Editar Tarea | 2- Ver otra tarea | 3- Salir"),10);
  }
   if (opcionRealizar == 1){
       await editarTareas(tareaElegida);
       let seguir = parseInt(await input("\n¿Desea ver otra tarea? 1- Si | 2- Salir: "), 10);
       if (seguir !== 1){
         continuar = 2
       }

   } else if(opcionRealizar ==2){
     continuar = 1

   }else if(opcionRealizar==3){
    continuar = 2
   }

  }while(continuar==1);
}


async function buscarTarea(){

  if (tareas.length === 0 ){
    console.log(`No hay tareas guardadas`);
    return;
  }

  const palabra = await input(`Para buscar la tarea ingrese el nombre `);
  const resultados = tareas.filter(t => t.titulo.toLowerCase().includes(palabra.toLowerCase()));

  if (resultados.length == 0 ){
    console.log(`No se encontro ninguna tarea`);
  }
  let continuar;
  do{
    console.log(`Resultado de ${palabra}`);

    for(let i = 0; i < resultados.length; i++){
      console.log(`${i+1} - Titulo: ${resultados[i].titulo} | Estado: ${resultados[i].estado}`);
    }

    let seleccion = parse(await input(`Ingrese el numero de la tarea que desea ver`),10);
    while (seleccion < 1 || seleccion > resultados.length){
      let seleccion = parse(await input(`Ingrese el numero valido, intente de nuevo`),10);
    }
    const tareaElegida = [seleccion - 1 ];
    console.log(`Titulo: ${tareaElegida.titulo}`);
    console.log(`Descripcion: ${tareaElegida.descripcion}`);
    console.log(`Estado: ${tareaElegida.estado}`);
    console.log(`Dificultad: ${tareaElegida.descripcion}`);
    console.log(` Fecha de creacion: ${tareaElegida.fechaCreacion}`);
    console.log(`Fecha de Vencimiento: ${tareaElegida,fechaVencimiento}`);

    console.log("\n¿Que desea realizar?");
    let opcionRealizar = parseInt(await input("1- Editar Tarea | 2- Ver otro resultado | 3- Volver al menu: "), 10);
    while (opcionRealizar < 1 || opcionRealizar > 3) {
      opcionRealizar = parseInt(await input("1- Editar Tarea | 2- Ver otro resultado | 3- Volver al menu: "), 10);
    }

    if (opcionRealizar === 1) {
      await editarTareas(tareaElegida);
      let seguir = parseInt(await input("\n¿Desea ver otro resultado? 1- Si | 2- Salir: "), 10);
      if (seguir !== 1) {
        continuar = 2;
      }
    } else if (opcionRealizar === 2) {
      continuar = 1;
    } else if (opcionRealizar === 3) {
      continuar = 2;
    }

  }while(continuar = 1);
  
}





async function editarTareas(tarea) {
  console.log("ingrese que desea editar");
    let opEdita = parseInt(await input("1-Titulo  | 2-Descripcion | 3-Estado | 4- Dificultad | 5- Fecha de vencimiento | 0- Salir "),10);
    while(opEdita < 0 || opEdita > 5){
        opEdita = parseInt(await input("Ingrese una respusta valida: 1-Titulo  | 2-Descripcion | 3-Estado | 4- Dificultad | 5- Fecha de vencimiento | 0- Salir "),10);
    }

    switch (opEdita){
        case 0:
            return; 
        break; 
        case 1: 
             console.log('\ningrese el titulo');
             tarea.titulo = await input("\nIngrese el nuevo titulo");
             tarea.fechaUltimaEdicion = new Date();

         break; 
        case 2:
            console.log('\ningrese la nueva descripcion');
             tarea.descripcion = await input("\nIngrese la descripcion");
             tarea.fechaUltimaEdicion = new Date();
        break; 
        case 3: 
         console.log(`\nIngrese el nuevo nuevo estado`);
             tarea.estado = parseInt(await input("\ningrese el estado de la tarea: 1- Pendiente 2- En Proceso 3- Completada 4- Cancelada"),10);
             while (tarea.estado < 1 || tarea.estado > 4){
              tarea.estado = parseInt(await input("\ningrese un estado valido: 1- Pendiente 2- En Proceso 3- Completada 4- Cancelada"),10);
             }
             tarea.estado = agregarEstado(tarea.estado);
             tarea.fechaUltimaEdicion = new Date();
        break; 
        case 4:
            console.log(`\nIngrese la nueva dificultad`);
            tarea.dificultad = parseInt(await input("\n Ingrese la nueva dificultad de la tarea: 1- Facil / 2- Media / 3- Dificil"),10);
            while (tarea.dificultad< 1 || tarea.dificultad> 3){
              tarea.dificultad = parseInt(await input("\n Ingrese la dificultad corrrecta de la tarea, Intente de nuevo: 1- Facil / 2- Media / 3- Dificil"),10);
             }
             tarea.dificultad = agregarDificultad(tarea.dificultad);
             tarea.fechaUltimaEdicion = new Date();
        break; 
        case 5:
             console.log(`\nIngrese la nueva fecha de vencimiento`);
             tarea.fechaVencimiento = await agregarVencimiento();
             tarea.fechaUltimaEdicion = new Date();

        break;
    }
}


module.exports = {agregarTarea, verTareaspendientes,editarTareas,verTareascanceladas,verTareascompletadas,verTareasproceso,tareas,buscarTarea};