require('./connection/MongodConnection');
const express = require('express')
const app = express()
const port = 3000

const BookRouter = require('./routers/BookRouters');
const BookshelfRouters = require('./routers/BookshelfRouters');

app.use(BookRouter)
app.use(BookshelfRouters)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})