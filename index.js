const express = require('express')
const app = express()
const port = 3000

const routerBookTransaction = require('./routes/bookTransaction');
const CheckBasicAuthorization = require('./middleware/basicAuthorization');

app.use(CheckBasicAuthorization)
app.use(routerBookTransaction)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})