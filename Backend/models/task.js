const {Schema,model} = require('mongoose')

const TaskScheme = Schema({
    title: {
        type: String,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
});

module.exports = model('Task', TaskScheme)