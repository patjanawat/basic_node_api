const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")
const { user } = require("../models")
const db = require("../models")
const User = db.user

verifyToken = (req,res,next)=>{
    let token = req.headers["x-access-token"]

    if(!token){
        return res.status(403).send({
            message: "No token provided!"
        })
    }

    jwt.verify(token,config.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message: "Unauthorize!"
            })
        }
        req.userId = decoded.id
        next()
    })
}

isAdmin = (req,res,next) => {
    user.findByPk(req.userId).then(user =>{
        user.getRoles().then(roles=>{
            for(let i = 0; i < roles;i++){
                if(roles[i]==="admin"){
                    next()
                    return
                }
            }

            res.status(403).send({
                message:"Require Admin Role!"
            })
        })
    })
}

isModerator = (req,res,next)=>{
    user.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles=>{
            for(let i = 0;i < roles.length; i++){
                if(roles[i] === "moderator"){
                    next()
                    return
                }
            }

            res.send(403).send({
                message: "Require Moderator Role!"
            })
        })
    })
}

isAdminOrModerator = (req,res,next) =>{
    user.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles=>{
            for(let i = 0;i < roles.length; i++){
                if(roles[i] === "admin"){
                    next()
                    return                                        
                }

                if(roles[i] === "moderator"){
                    next()
                    return
                }
            }

            return res.status(403).send({
                message: "Require moderator or admin role!"
            })
        })
    })
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isAdminOrModerator: isAdminOrModerator
}

module.exports = authJwt