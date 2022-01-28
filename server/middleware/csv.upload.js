const multer = require('multer')
const path = require('path')

const csvFilter = (req,file,cb) => {
    if(file.mimetype.includes('csv')){
        cb(null,true);
    } else {
        cb("Please upload only csv file.",false)
    }
}

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log("Path=>",path.join(__dirname,"../resources/static/assets/uploads/"))
      cb(null, path.join(__dirname,"../resources/static/assets/uploads/"))
    },
    filename: (req, file, cb) => {
      console.log(file.originalname);
      cb(null, `${Date.now()}-bezkoder-${file.originalname}`)
    }
  })

var uploadFile = multer({storage: storage, fileFilter: csvFilter})
module.exports = uploadFile