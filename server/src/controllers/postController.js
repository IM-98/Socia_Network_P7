const PostModel = require("../models/post")
const User = require("../models/user")
const ObjectID = require("mongoose").Types.ObjectId
const sharp = require("sharp");
const { uploadErrors } = require("../utils/errors");
const fs = require("fs")
const path = require("path")

exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs)
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 })
}

exports.createPost = async (req, res) => {
  let fileName;
  console.log(req.file)
  console.log(req.body.posterId)

  if (req.file) {
    try {
      if (
        req.file.mimetype != "image/jpg" &&
        req.file.mimetype != "image/png" &&
        req.file.mimetype != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      console.log(err)
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";
    await sharp(req.file.buffer)
      .toFile(`${__dirname}/../../uploads/posts/${fileName}`);
    console.log(`${__dirname}/../../uploads/posts/${fileName}`)

  }

  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file ? `${fileName}` : "",
    video: req.body.video,
    likers: [],
    comments: [],
  })

  console.log(newPost)

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  }
  catch (err) {
    console.log(err)
    return res.status(400).send(err);
  }
}

//implémentation de la vérification si la personne qui modifie est l'auteur ou un Admin
exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("unknown ID" + req.params.id)
  }

  const updatedRecord = {
    message: req.body.message
  }
  PostModel.findById(req.params.id, (err, docs) => {
    if (!err) {
      if ((req.body.userId === docs.posterId) || req.body.isAdmin) {

        PostModel.findByIdAndUpdate(
          req.params.id,
          { $set: updatedRecord },
          { new: true },
          (err, docs) => {
            if (!err) res.send(docs)
            else console.log("update error : " + err)
          }
        )

      } else { console.log(err) }
    }
    else console.log(err)
  })

}

//implémentation : supression des fichiers après qu'un user supprime son post + check isAdmin et isAuthor

exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("unknown ID" + req.params.id)
  }
  PostModel.findById(req.params.id, (err, docs) => {
    if (!err) {
      if ((req.body.userId === docs.posterId) || req.body.isAdmin) {
        PostModel.findByIdAndDelete(
          req.params.id,
          (err, docs) => {
            if (!err) {
              res.send(docs)
              if (docs.picture !== "") {
                fs.unlink(path.join(__dirname, '../..', 'uploads/posts') + `/${docs.picture}`, (err) => { if (err) throw err })
              }
            }
            else console.log("delete error : " + err)
          }
        )
      } else console.log("pas marché")
    } else console.log(err)

  })
}

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));

    await User.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true })

  } catch (err) {
    return res.status(400).send(err);
  }
};


module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));

    await User.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true })
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      console.log(docs)
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(400).send(err);
  }
};