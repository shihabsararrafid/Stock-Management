import multer from 'multer'
import { nanoid } from 'nanoid'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.FILE_UPLOAD_DIR || 'uploads/')
  },
  filename: function (req, file, cb) {
    let filename = ''

    filename += nanoid(50) + path.extname(file.originalname)
    cb(null, filename)
  },
})

export const upload = multer({ storage })
