const db = require("../models")
const Tutorial = db.Tutorial

const fs = require("fs")
const csv = require("fast-csv")
const path = require("path")

const CsvParser = require("json2csv").Parser

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

const download = (req,res) => {
    Tutorial.findAll()
        .then(rows=>{
            let tutorial = []

            rows.forEach((row)=>{
                const {id, title, description, published} = row;
                tutorial.push({id,title,description,published})                
            })

            const csvFields = ["Id","Title","Description","Published"]
            const csvParser = new CsvParser({csvFields})
            const csvData = csvParser.parse(tutorial)

            res.setHeader("Content-Type","text/csv")
            res.setHeader("Content-Disposition","attachment; filename=tutorials.csv")

            res.status(200).end(csvData)
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occure when trying to download tutorials"})
        })
}

module.exports = {
    upload,
    getTutorials,
    download
}