import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "profileImage") {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload an image.'), false);
        }
    } else if (file.fieldname === "cvFile") {
        if (file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(new Error('Not a JPG! Please upload a JPG file.'), false);
        }
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
}); 