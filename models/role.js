// se creó una colección en mongo de nombre roles, este archivo debe ser creado sin la s, es decir: role

const { Schema, model } = require('mongoose')
const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
    }
})

module.exports = model('Role', RoleSchema)