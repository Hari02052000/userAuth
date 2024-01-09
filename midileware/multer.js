const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/profile/')

    },

    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
      }
})

const upload = multer({storage:storage})

function FileUpload(req,res,next){
    
    const uploadSingle = upload.single('image');

    uploadSingle(req, res, function (err) {
        if (err) {
          console.log(err.message);
        }
        next();
      });
    

}



module.exports = {FileUpload}