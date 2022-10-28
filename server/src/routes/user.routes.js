const express = require('express');
const router = express.Router();
const multer = require("multer")
const upload = multer()

const authCtrl = require('../controllers/authController');
const userCtrl = require("../controllers/userControler")
const uploadCtrl = require("../controllers/uploadController")

// authentification
router.post('/signup', authCtrl.register);
router.post('/login', authCtrl.signIn);
router.get("/logout", authCtrl.logout )


// User CRUD

router.get("/", userCtrl.getAllUsers)
router.get("/:id", userCtrl.getUserInfo)
router.put("/:id", userCtrl.updateUser)
router.delete("/:id", userCtrl.deleteUser)
router.patch("/follow/:id", userCtrl.follow)
router.patch("/unfollow/:id", userCtrl.unfollow)

//Upload

router.post("/upload", upload.single("file"), uploadCtrl.uploadProfil)



module.exports = router