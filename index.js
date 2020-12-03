const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send({
        hi: "there"
    })
})

const PORT = process.env.PORT || 1488

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} port`)
})