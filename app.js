const express = require('express')
const app = express()
const port = 3000

const MongooseConnect = require('./connection/MongodConnection');
const BookRouter = require('./routers/BookRouters');

app.use(BookRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})