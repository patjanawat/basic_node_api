const db = require("../models")
const Tutorial = db.Tutorial

const fs = require("fs")
const csv = require("fast-csv")

const path = require("path")

const upload = async (req,res)=>{
    try {
        if(req.file == undefined) {
            return res.status(400).send({message:"Please upload a CSV file"})
        }

        let tutorials = [];
        let filePath =path.join(__dirname,"../resources/static/assets/uploads/",req.file.filename)        
        console.log('CSV path:'+ filePath)

        fs.createReadStream(filePath)
            .pipe(csv.parse({header: true}))
            .on("error",(error)=>{
                throw error.message
            })
            .on("data",(row)=>{
                
                let data = {
                    id: row[0],
                    title:row[1],
                    description: row[2],
                    published: row[3]
                }
                console.log("data=>",data)

                tutorials.push(data)
            })
            .on("end",()=>{

                console.log("data=>",tutorials)

                Tutorial.bulkCreate(tutorials)
                    .then(()=>{
                        res.status(200).send({message:"Upload the file successfully "+ req.file.originalname})
                    })
                    .catch((error)=>{
                        res.status(500).send({message: error.message || "Fail to import data into database!"})
                    })
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Could not upload the file:"+ req.file.originalname})
    }
}

const getTutorials = (req,res) =>{
    Tutorial.findAll()
        .then((data)=>{
            res.send(data)
        })
        .catch((error)=>{
            res.status(500).send({message: error.message || "Some error occurred while retriving tutorials"})
        })
}

module.exports = {
    upload,
    getTutorials
}