import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads/");
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, uniqueSuffix + '-' + file.originalname);
    }
});
const fileFilter = (req, file, callback) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "audio/mpeg", "audio/mp3", "audio/wav"];
    const allowedExtensions = /jpeg|jpg|png|gif|mp3|wav/;

    const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedMimeTypes.includes(file.mimetype);

    if (extname && mimeType) {
        callback(null, true);
    } else {
        callback(new Error("Error: File upload only supports images and audio!"));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, 
});

export default upload;
