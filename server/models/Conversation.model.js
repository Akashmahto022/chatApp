import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    members: {
        type: Array,
        required: true
    }
}, {timestamps:true})

export const Conversation = mongoose.model('Conversation', conversationSchema)