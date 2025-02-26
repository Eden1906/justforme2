import express from "express";
import cors from "cors"
import db from "./mongodb.js"; 
import pool from './psql.js'

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
app.get("/users", async(req, res)=> {
    try{
        const allUsers = await users.find()
        res.status(200).json({allUsers})
    } catch(error){
        res.status(500).json({message:"unable to find users"})
        console.log(error)
    }
})
app.get("/searchuser", async(req, res)=> {
    try{
        const {name} = req.query
        const searchUsers = await users.find({name: {$regex: name, $options: "i"}})
        res.json(searchUsers)
    }catch(error){
        res.status(500).json({message:"unable to find the user by search"})
    }
})

app.post("/addNames", async (req, res) => {
    const {name} = req.body
    if(!name){
        return res.status(400).json({error:"name is required"})
    }
    try{
        const result= await pool.query('INSERT INTO people (name) VALUES ($1) RETURNING *', [name])
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.log(error)
    }
})
app.get("/findNames", async(req, res)=> {
    try{
        const result = await pool.query('SELECT * FROM people')
        res.status(201).json(result)
    } catch(error){
        console.error(error)
    }

})

app.listen(3000, () => {
    console.log("Backend port is connected");
});
