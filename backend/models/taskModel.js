const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    texto: {
        type: String,
        required: [true, 'Please add a texto value']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', taskSchema);