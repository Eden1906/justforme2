import mongoose from "mongoose"
mongoose.connect("mongodb://localhost:27017/justForMe2")
.then(()=> {
    console.log("mongo db is connected")
}).catch(()=> {
    console.log("failed to connect to mongo db")
})

const signInSchema= new mongoose.Schema({
    name:{
        type: String
    },
    password:{
        type:String
    }
})
const messagesSchema= new mongoose.Schema({
    message:{
        type: String
    }
})

const users= new mongoose.model("users", signInSchema)
const messages= new mongoose.model("messages", messagesSchema)

export default {users, messages}