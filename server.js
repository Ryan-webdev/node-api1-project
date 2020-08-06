const express = require("express")
const db = require("./database.js")

const server = express()

server.use(express.json())




//post user
server.post("/api/users", (req, res) => {
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })
    try {
        if (!req.body.name || !req.body.bio) {
            return res.status(400).json({ message: "Please provide name and bio for the user." })
        } else {
            res.status(201).json(newUser)
        }
    } catch (error) {
        return res.status(500).json({ errorMessage: "Please provide name and bio for the user." })
    }
})

//get users
server.get("/api/users", (req, res) => {
    const users = db.getUsers()
    if (users) {
        res.json(users)
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})

//get users by id

server.get("/api/users/:id", (req, res) => {
    const users = db.getUserById(req.params.id)
    try {
        if (users) {
            res.json(users)
        }else{
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    }catch(error){
        res.status(500).json({errorMessage: "The user information could not be retrieved."})
    }
})

//delete users by id
server.delete("/api/users/:id", (req, res)=> {
    const users = db.getUserById(req.params.id)
    try {
        if(users){
            db.deleteUser(users.id)
            res.status(204).end()
        }else{
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    }catch(error){
        res.status(500).json({errorMessage: "The user could not be removed"})
    }
})

//update user by id

server.put("/api/users/:id", (req, res)=> {
    const users = db.getUserById(req.params.id)

    try{
        if(users){
            const updateUser = db.updateUser(users.id, {
                name: req.body.name || users.name,
                bio: req.body.bio || users.bio,
            })
            res.status(200).json(updateUser)
        }else{
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    }catch(error){
        res.status(500).json({errorMessage: "The user information could not be modified."}) || res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
})













server.listen(8080, () => {
    console.log("server started on port 8080")
})