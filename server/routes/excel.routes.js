const express = require('express')
const router = express.Router()

const controller = require("../controllers/excel.controller")

let routes = (app)=>{
    router.get('/download',controller.download)
    app.use("/api/excel",router)    
}

module.exports = routes
