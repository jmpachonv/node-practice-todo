const fs = require('fs');
const colors = require('colors');
const { v4: uuidv4 } = require('uuid');

let toDoListado = [];
let archivoTareas = 'data.json';

const crearTarea = (descripcion) => {

        cargarTareas();

        let taskId = uuidv4();

        let toDo = {
            id: taskId,
            descripcion: descripcion,
            completada: false
        };

        toDoListado.push(toDo);
        guardarTarea();

        return toDo;
    
}

const guardarTarea = () => {
    
    let data = JSON.stringify(toDoListado);
    let archivo = 'tareas/data.json'
    fs.writeFile(archivo, data, (err) => {
        if(err){
            throw err;
        }
        // console.log(`El archivo se ha guardado correctamente...`);
    });
}

const cargarTareas = () => {
    try {
        toDoListado = require(`../tareas/${archivoTareas}`);
    } catch (error) {
        toDoListado = [];
    }
}

const obtenerListadoTareas = () => {
    cargarTareas();
    return toDoListado;
}

const actualizarTareaPorDescripcion = (descripcion, completada = true) => {
    
    cargarTareas();

    let index = toDoListado.findIndex( (tarea) => { 
        return tarea.descripcion === descripcion 
    });

    console.log(index);

    if(index >= 0){
        toDoListado[index].completada = completada;
        guardarTarea();
        return true;
    }else{
        return false;
    }
}

const actualizarTareaPorId = (id, descripcion, completada = true) => {
    
    cargarTareas();

    let index = toDoListado.findIndex( (tarea) => { 
        return tarea.id === id 
    });

    console.log(index);

    if(index >= 0){
        toDoListado[index].completada = completada;
        toDoListado[index].descripcion = descripcion;
        guardarTarea();
        return true;
    }else{
        return false;
    }
}

const eliminarTareaPorDescripcion = (descripcion) => {
    cargarTareas();

    let initSize = toDoListado.length;

    let filteredTareas = toDoListado.filter( function(tarea) {
        return tarea.descripcion !== descripcion;
    });

    toDoListado = filteredTareas;

    let finishSize = filteredTareas.length;

    if(finishSize < initSize){
        guardarTarea();
        return true;
    } else {
        return false;
    }
}

const eliminarTareaPorId = (id) => {

    cargarTareas();

    let initSize = toDoListado.length;

    let filteredTareas = toDoListado.filter( function(tarea) {
        return tarea.id !== id;
    });

    toDoListado = filteredTareas;

    let finishSize = filteredTareas.length;

    if(finishSize < initSize){
        guardarTarea();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crearTarea,
    obtenerListadoTareas,
    actualizarTareaPorDescripcion,
    actualizarTareaPorId,
    eliminarTareaPorDescripcion,
    eliminarTareaPorId
}
