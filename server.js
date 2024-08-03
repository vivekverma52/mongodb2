const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3000

const app = express();

app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true}))


mongoose.connect('mongodb+srv://567vivekverma:vivekverma@vivek5678.ik6ogcr.mongodb.net/mongodb?retryWrites=true&w=majority&appName=vivek5678')
const db = mongoose.connection
db.once('open', () =>{
    console.log("Connected to MongoDB")
})

const userSchema = new mongoose.Schema({
    regd_no:String,
    name:String,
    email:String,
    branch:String,
})

const Users = mongoose.model('data', userSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'))
})


app.post('/post',async (req, res) => {
  try{
    const { regd_no, name, email, branch } = req.body
    const user = new Users({
        regd_no,
        name,
        email,
        branch,
})
    await user.save()
    console.log(user)
    res.send("Form submitted successfully")
  }
  catch(e){
    console.log(e)
    res.status(500).send('Error saving data')
    return  // stop further execution if error occurs
  }
})

app.listen(port,()=>{
    console.log("listening on port")
})