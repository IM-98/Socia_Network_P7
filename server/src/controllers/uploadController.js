const User = require("../models/user")
const fs = require("fs")
const sharp = require("sharp");
const { uploadErrors } = require("../utils/errors");

exports.uploadProfil = async (req, res) => {
  const fileName = req.body.name  + ".jpg";
  try {
    if (
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/png" &&
      req.file.mimetype != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }


  await sharp(req.file.buffer)
    .resize({ width: 150, height: 150 })
    .toFile(`${__dirname}/../../uploads/profile/${fileName}`);
  try {
    await User.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: `/${fileName}` } },
      { new: true, upsert: true, setDefaultsOnInsert: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));

  } catch (err) {
    return res.status(500).send({ message: err });
  }
}


