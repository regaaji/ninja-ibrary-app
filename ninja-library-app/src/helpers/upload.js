const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, './src/uploads')
  },
  filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}`+path.extname(file.originalname))
  }

})
const fileFilter = (request, file, cb, error) => {
  const imageFilter = file.mimetype.toLowerCase()
  if (imageFilter === 'image/jpg' || imageFilter === 'image/jpeg' || imageFilter === 'image/png') {
    cb(null, true)
  } else {
    cb('extension image only jpeg jpg and png', false)
  }
}
const upload = multer({
  storage,
fileFilter,
  limits: {
    fileSize: 2024 * 2024
  }
})
const uploads = upload.single('image')

module.exports = { bookUpload: uploads }