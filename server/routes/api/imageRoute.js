const router = require('express').Router();
const multer = require('multer');
const path = require('path');

// Location where your image will be uploaded to. Plus setting a filename
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// This folder has to exist if not this will throw an error
		cb(null, path.join(__dirname, './public/images/uploads'));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		//get the extesion of the file for renaming the stored image so it has a unique name
		let ext = path.extname(file.originalname);
		cb(null, file.fieldname + '-' + uniqueSuffix + ext)
	}
})

const upload = multer({ storage: storage });

// https://www.npmjs.com/package/multer
router.post('/upload', upload.single('dogPic'), function (req, res) {
	console.log(req.file, req.body);
	console.log("File received: ", req.file.filename);
	
	const file = {
		filePath: `/public/images/uploads/${req.file.filename}`,
		fileName: req.file.filename,
		publicFilePath: `/images/uploads/${req.file.filename}`
	};
	
	res.json(file);
});

module.exports = router;