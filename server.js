const express = require("express")
const db = require("./database.js")

const server = express()

server.use(express.json())




//post
server.post("/api/users", (req, res) => {
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })
    try{
    if(!req.body.name || !req.body.bio){
        return res.status(400).json({message: "Please provide name and bio for the user."})
    }else {
        res.status(201).json(newUser)
    }
    }catch(error){
        return res.status(500).json({errorMessage: "Please provide name and bio for the user."})
    } 
})













server.listen(8080, () => {
	console.log("server started on port 8080")
})