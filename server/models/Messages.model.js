import mongoose, { Schema } from "mongoose";

const messagesSchema = new Schema({
    conversationId: {
        type: String
    },
    senderId:{
        type: String,
    },
    message:{
        type: String
    }
},{timestamps:true})

export const Messages = mongoose.model('Messages', messagesSchema)