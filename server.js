import express from "express";
import cors from "cors"
import db from "./mongodb.js"; 

const {users} = db
const {messages} = db
const app = express();

app.use(cors())
app.use(express.json());

app.post("/signup", async (req, res)=> {
    console.log("Received signup request:", req.body)
    const {name, password}= req.body
    try{
        const newUser= new users({name, password})
        await newUser.save()
        res.status(201).json({message: "user registered"})
    }catch(error){
        res.status(500).json({error: "failed to register"})
    }
})
app.post("/login", async(req, res)=> {
    try{
        console.log("Received login information:", req.body)
        const loginUser= await users.findOne({name: req.body.name})
        if(!loginUser){
            return res.status(401).json({status:"error", message:"משתמש לא נמצא"})
        }
        if (loginUser.password === req.body.password) {
            return res.status(201).json({message:"user successfuly login"})
        }else{
            return res.status(401).json({message:"password incorrect"})
        }
    }catch(error){
        console.log("login error:", error)
        res.status(500).json({error: "user failed to login"})
    }
})
app.post("/messages", async(req, res)=> {
    const {message}= req.body
    try{
        const newMessage= new messages({message})
        await newMessage.save()
        res.status(200).json({message: "message has been saved"})
    } catch(error){
        res.status(500).json({error:"problem in saveing the message"})
        console.log(error)
    }
})
app.get("/messages", async(req,res)=> {
    try{
    const allMessages = await messages.find()
    res.status(200).json({allMessages})

    } catch(error){
        res.status(500).json({message:"unable to find messaages"})
        console.log(error)
    }
})



app.listen(3000, () => {
    console.log("Backend port is connected");
});
