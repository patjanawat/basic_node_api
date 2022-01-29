const db = require('../models')
const Tutorial = db.Tutorial

const excel = require("exceljs")

const download = (req,res)=>{
    Tutorial.findAll()
        .then(rows=>{
            let tutorials = [];

            rows.forEach(row => {
                tutorials.push({
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    published: row.published
                })
            })

            let workbook = new excel.Workbook()
            let worksheet = workbook.addWorksheet("Tutorials")

            worksheet.columns = [
                {header: "Id", key:"id", width: 5},
                {header: "Title", key:"title",width:25},
                {header: "Description", key:"description",width:25},
                {header: "Published", key:"published",width:10}
            ]

            worksheet.addRows(tutorials)

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )

            res.setHeader(
                "Content-Disposition",
                "attachment; filename="+"tutorials.xlsx"
            )

            return workbook.xlsx.write(res).then(()=>{
                res.status(200).end()
            })
        })
        .catch((err)=>{
            res.status(500).send({message: err.message || "Error ocurred when trying to download tutorials"})
        })
}

module.exports = {
    download
}