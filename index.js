require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const { db } = require('./connection')
const authRoutes = require('./routes/user.routes')
const blogRoutes = require('./routes/blog.routes')

db()
app.use(cors())
app.use(express.json())

app.use('/api/user', authRoutes)
app.use('/api/blog', blogRoutes)
app.get('/', (req, res) => {
  res.status(200).send('Welcome to my Blog app')
})

app.listen(process.env.PORT, () => {
  console.log(`Listening to localhost ${process.env.PORT}`)
})
