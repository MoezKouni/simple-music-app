const express = require('express')
const app = express()
const mongoose = require('mongoose')

// init middleware
app.use(express.json())

// Connect DB
const db = "mongodb+srv://moez123:moez123@musics-1m4yc.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true },(err) => {
    if(err) throw err
    console.log('Database connected!!...')
})


// Define Routes
app.use('/api/user', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/music', require('./routes/music'))


app.listen(5000, () => console.log('Server is listening on port 5000...'))