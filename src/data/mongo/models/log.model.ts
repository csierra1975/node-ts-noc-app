
import mongoose from "mongoose";

const logScheme = new mongoose.Schema({
    message: {
        type: String,
        required: true
    }, 
    level: {
        type: String,
        enum:['low','medium','high'],
        default: 'low'
    }, 
    origin: {
        type: String
    },
    createAt: {
        type: String,
        default: new Date()
    },
})

export const LogModel = mongoose.model('Log', logScheme)