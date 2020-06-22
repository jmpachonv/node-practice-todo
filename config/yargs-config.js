//Comandos de la práctica:

//node app crear --descripcion "Pasear al perro"
//node app crear -d "Pasear al perro"
//node app listar
//node app actualizar -d "Pasear al perro" -c true

const options = {
    descripcion: {
        demand:true,
        alias: 'd',
        desc: 'Descripción de la tarea por hacer'
    },
    completada: {
        alias: 'c',
        default: true,
        desc: 'Marca como completada la tarea',
        type: 'boolean'
    }
}

const id = {
    demand: false,
    desc: 'Id de la tarea'
}

const descripcion = {
    demand:false,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

const completada = {
    alias: 'c',
    default: true,
    desc: 'Marca como completada la tarea',
    type: 'boolean'
}

const argv = require('yargs')
                    .command('crear', 'Crea una tarea nueva en el To-do', options)
                    .command('listar', 'Lista las tareas existentes en el To-do', {})
                    .command('actualizar', 'Actualiza una tarea existente en el To-do', {
                        id,
                        descripcion,
                        completada
                    })
                    .command('eliminar', 'Elimina una tarea existente en el To-do', {
                        id,
                        descripcion,
                        completada
                    })
                    .command('buscarId', 'Encuentra por Id una tarea existente en el To-do', {
                        id: {
                            demand: true
                        }
                    })
                    .help()
                    .argv

module.exports = {
    argv
}
