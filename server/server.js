const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require("./models")
const Role = db.role
// db.sequelize.sync()
// For development: drop existing tables and re-sync database.
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.")
    initial();
});

function initial(){
    Role.create({
        id: 1,
        name: 'user'
    })

    Role.create({
        id: 2,
        name: "moderator"
    })

    Role.create({
        id: 3,
        name: 'admin'
    })
}

app.get('/', (req, res) => {
    res.json({ message: 'Wellcome to node api' })
})

require('./routes/tutorial.routes')(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})