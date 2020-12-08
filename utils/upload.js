const multer = require("multer");
const sharp = require("sharp");
const AppError = require("./AppError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImages = upload.fields([
  {
    name: "photo",
    maxCount: 1,
  },
]);

exports.resizeImages = async (req, res, next) => {
  try {
    if (!req.files.photo) return next();

    req.body.photo = `image-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.photo[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/${req.body.photo}`);

    next();
  } catch (err) {
    console.log(err);
  }
};
