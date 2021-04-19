const conn = require("../config/sequelizeConfig");
const fs = require("fs");
const bycrypt = require("bcrypt");
const userUpload = require("../libs/users");
const saltRounds = 10;
const {models} = require("../models/index");
const jwt = require("jsonwebtoken");
const storage = require("../libs/handyStorage");
const handle = require("../libs/promiseHandler");



const authController={
    showRegister: (req, res)=>{
        res.render("./landing");
    },
    register: (req, res)=>{
        if(conn.error){
            res.status(500);
        }else{
            userUpload(req, res, (err) => {

                if(err){
                    res.status(500).render("./register", {err: 'Error Uploading image $(err)'});
                }else{
                    if(req.body.email==="" || req.body.password==="" || req.body.username===""){

                        let avatarspPath = './users/avatars/${req.file.filename}';
                        fs.unlinkSync(avatarsPath, (err)=>{
                                if(err){
                                    console.log('Error deleting ${req.file.filename}')
                                }
                        });
                        res.status(500).render("./landing", {err : "PLease fill all the form elements"});
                    }else{
                        
                        let hash = bycrypt.hashSync(req.body.password, saltRounds);

                        //save the user
                        models.User.create({
                            email: req.body.email,
                            password : req.body.password,
                            gender: req.body.gender,
                            username: req.body.username,
                            fullName: req.body.fullName,
                            avatarUrl: req.file.filename,
                            avatarName: req.file.filename
                        }).then((user)=>{
                            console.log(user);
                            storage.setState({
                                token:jwt.sign({user:req.body.email},"supersecretpassword", {expiresIn: '2hr'}),
                                user:user.dataValues
                            })
                            res(status(201).redire6ct("/"));
                        }).catch(err=>{
                            console.log(err);
                            res.status(500).render("./landing",{
                                err: 'there was an error : ${err}'
                            })
                        })
                    }
                }
            });
        }
    },
    showLogin: (req, res)=>{
        res.render("./landing");
    },
    login: (req, res)=>{
      
        //    if(err){
        //        console.log(err);
        //    }

        //    const [user,userError] =await handle(models.User.findOne({
        //        where: {email:req.body.email},
        //        include: [{model: models.post}]

        //    }));

        //    if(userError){
        //        res.status(500).render("./login",{
        //            err:"error reaching the user please try again"
        //        })

        //    }
        //    if(user){
        //        let password=req.body.password;
        //        let userHash= req.dataValues.password;

        //        bycrypt.compare(password,userHash, (err,success) =>{
        //            if(!success){

        //             res.status(500).render("./login", {err:"there was an error processing the request"})
        //            }else{
        //                storage.setState({
        //                 token:jwt.sign({user:req.body.email},"supersecretpassword", {expiresIn: '2hr'}),
        //                 user:user.dataValues
        //                });

        //                user.Posts.map(p=>{
        //                     console.log(p.dataValues);
        //                });
        //            }
        //        })
        //    }
       
    },
    logout: (req, res)=>{
        res.render("./landing");
    },
    showDashboard: (req, res)=>{
        res.render("./index");
    },
}

module.exports=authController;