const express = require('express')
const app = express()
var cors = require('cors')
const connectToMongo = require('./db')
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json());
connectToMongo();

app.use('/api/auth', require('./routes/auth'))
app.use('/api/post', require('./routes/post'))


app.listen(port, () => {
  console.log(`Backend listening on port http://localhost:${port}`)
})