// 5 required for file uploads
const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        return cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
    },
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (["image/png", "image/jpeg"].includes(file.mimetype)) {
            return cb(null, true);
        } else {
            return cb(new Error("invalid file type"), false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB maximum (1024*1024 = 1 megabyte MB)
    },
});

module.exports = upload;
