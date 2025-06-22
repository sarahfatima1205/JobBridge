import multer from "multer";

// store files in memory (no local save needed)
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
