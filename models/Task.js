const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    taskTitle: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    }
}, {timeStamps: true})

module.exports = mongoose.model("Task", taskSchema)