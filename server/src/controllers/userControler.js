const User = require('../models/user');
const ObjectID = require("mongoose").Types.ObjectId

exports.getAllUsers = async (req, res)=>{
    const users = await User.find().select("-password")
    res.status(200).json(users)

}

exports.getUserInfo = (req, res)=>{
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send("unknown ID" + req.params.id)
    }
     
    User.findById(req.params.id, (err, data)=>{
        if(!err) res.send(data)
        else console.log("unknown ID" + req.params.id)  
    }).select("-password")
}

exports.updateUser = (req, res)=>{
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send("unknown ID" + req.params.id)
    }
    try {
        User.findByIdAndUpdate(
            {_id : req.params.id},
            {
                $set : {
                    bio: req.body.bio
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert : true},
            (err,docs) => {
                if(!err) return res.send(docs)
                else return res.status(500).send({mesage : err})
            }

        )
    } 
    catch (err) {
        return res.status(500).json({mesage : err})
    }
}

exports.deleteUser = (req, res)=>{
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send("unknown ID" + req.params.id)
    }
    try {
        User.remove({_id : req.params.id}).exec();
        res.status(200).json({message : "successfully deleted"})
    } 
    catch (err) {
        console.log(err)
        return res.status(500).json({mesage : err})
    }
}

exports.follow = (req, res) => {
    if (!ObjectID.isValid(req.params.id || !ObjectID.isValid(req.body.idToFollow))){
        return res.status(400).send("unknown ID" + req.params.id)
    }
    try {
        // ajout de la personne suivi par le user dans la liste des abonnements
        User.findByIdAndUpdate(
            req.params.id, 
            {$addToSet : {following: req.body.idToFollow}},
            {new: true, upsert: true},
            (err, docs) => {
                if(!err) res.status(201).json(docs)
                else return res.status(400).json(err)
            }
        )
         // ajout de notre user dans la liste des abonnés de la personne suivi
        User.findByIdAndUpdate(
            req.body.idToFollow,
            {$addToSet : {followers: req.params.id}},
            {new: true, upsert: true},
            (err, docs) => {
                // if(!err) res.status(201).json(docs)
                if(err) return res.status(400).json(err)
            }
            )
    } catch (err) {
        return res.status(500).json({mesage : err})
    }
}
exports.unfollow = (req, res) => {
    if (!ObjectID.isValid(req.params.id || !ObjectID.isValid(req.body.idToUnfollow))){
        return res.status(400).send("unknown ID" + req.params.id)
    }
    try {
        // retrait de la personne suivi par le user dans la liste des abonnements
        User.findByIdAndUpdate(
            req.params.id, 
            {$pull : {following: req.body.idToUnfollow}},
            {new: true, upsert: true},
            (err, docs) => {
                if(!err) res.status(201).json(docs)
                else return res.status(400).json(err)
            }
        )
         // retrait de notre user dans la liste des abonnés de la personne suivi
        User.findByIdAndUpdate(
            req.body.idToUnfollow,
            {$pull : {followers: req.params.id}},
            {new: true, upsert: true},
            (err, docs) => {
                // if(!err) res.status(201).json(docs)
                if(err) return res.status(400).json(err)
            }
            )
    } catch (err) {
        return res.status(500).json({mesage : err})
    }
}