const express = require('express')
const app = express()
const port = 5000

app.get('/', (request, response) => {
  response.send('Server Running with Express')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('looks like an error has occurred', err)
  }

  console.log(`Server is listening on port ${port}`)
})
