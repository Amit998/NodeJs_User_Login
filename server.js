const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

// const users=[
//    { 
//        name:"Amit"
//     }
// ]

const users = []
app.get('/users',(req,res) =>{
    res.json(users)
})


app.post('/users',async(req,res) =>{
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.name,salt)
        // console.log(salt)
        // console.log(hashedPassword)
        console.log(req.body.name)
        console.log(req.body.password)
        
        const user = { name: req.body.name , password:hashedPassword }
        users.push(user)
        res.status(201).send()

    }catch{
        res.status(500).send()
    } 
})




app.post('/users/login', async(req,res) =>{
    const user= users.find(user => user.name ="amit")
    if(user == null){
        return res.status(400).send('cannot find user')
    }
    try{
       if(await bcrypt.compare(req.user.password,user.password)){
           res.send('success')
       }else{
           res.send('not success')
           console.log(user.password,'lol')
       }
    }catch{
        res.status(500).send()
    }
})

app.listen(3000)
