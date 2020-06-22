const argv = require('./config/yargs-config').argv;
const colors = require('colors');

const toDo = require('./to-do/todo');

let comando = argv._[0];
let id = argv.id;
let descripcion = argv.descripcion;
let completada = argv.completada;

switch(comando){

    case 'crear':
        let tareaNueva = toDo.crearTarea(descripcion);
        console.log(tareaNueva);
    break;
    
    case 'listar':
        let tareasExistentes = toDo.obtenerListadoTareas();

        for (let i = 0; i < tareasExistentes.length; i++) {
            console.log('===============TAREA================'.green);
            console.log('Id: ', tareasExistentes[i].id);
            console.log('Descripción:', tareasExistentes[i].descripcion);
            console.log('Completada: ', tareasExistentes[i].completada);
            console.log('===================================='.green);
        }

    break;
    
    case 'buscarId':
        console.log(id);
    break;

    case 'actualizar':

        let actualizada = toDo.actualizarTareaPorDescripcion(descripcion, completada);
        let actualizadaId = false;

        if(!actualizada){
            actualizadaId = toDo.actualizarTareaPorId(id, descripcion, completada);
        }

        console.log(`Resultado de actualización: ${actualizada || actualizadaId}`);
    break;
    
    case 'eliminar':

        let eliminada = toDo.eliminarTareaPorDescripcion(descripcion);
        let eliminadaId = false;

        if(!eliminada){
            eliminadaId = toDo.eliminarTareaPorId(id);
        }

    break;
    
    default:
        console.log(`El comando ${comando} no existe...`);
    break;
}
