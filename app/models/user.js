const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            // the emaid id used by user will be passes as argument to this fuction
            // which will be caught in vlue
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return "invalid email format"
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128
    },
    stories: [
        
    ],
    bookmarks: [

    ],
    followers: [

    ],
    following: [

    ],
    clappedStories: [

    ],
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

userSchema.pre("save", function(next){
    const user = this

    if(user.isNew){
        bcryptjs.genSalt(10)
        .then((salt) => {
            bcryptjs.hash(user.password, salt)
                .then((encryptedPwd) => {
                    user.password =  encryptedPwd
                    next()
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
    }else{
        next()
    }
    
})

userSchema.statics.findByCredentials = function(email, password){
    const User = this

    return User.findOne({email})
            .then(function(user){
                if(!user){
                    return Promise.reject({notice: "invalid email"})
                }
                return bcryptjs.compare(password, user.password)
                        .then(function(result){
                            if(result){
                                return Promise.resolve(user)
                            }else{
                                return Promise.reject({notice: "invalid password"})
                            }
                        })
            })
            .catch(function(err){
                return Promise.reject(err)
            })
}

userSchema.statics.findByToken = function(token){
    // in static method the "this" refers to "User" model 
    const User = this
    let tokenData 

    try{
        tokenData = jwt.verify(token, "jwt@123")
    }catch(err){
        return Promise.reject(err)
    }

    // here findOne is a conditional check, if the id in db == tokendata.id
    // here the token is provided by "user" that is decoded using verify
    // that contains an "id", "username", "createdAt" props .
    // in that we are checking the "_id" of "User" model == tokenData._id
    return User.findOne({
            "_id": tokenData._id,
            "tokens.token": token
        })
}

userSchema.methods.generateToken = function(){
    // in instance methods "this" referes to "user" obj defnd in controller.
    // the "user" obj is defnd in the "then" part 
    // in static methods "this" referes to "User" model.
    const user = this
    const tokenData = {
        "_id": user._id,
        "username": user.username,
        "createdAt": Number(new Date())
    }

    const token = jwt.sign(tokenData, "jwt@123")

    user.tokens.push({
        // ES-6 concise prop can be used
        token: token
    })
    
    return user.save()
            .then(function(user){
                return Promise.resolve(token)
            })
            .catch(function(err){
                return Promise.reject(err)
            })
}

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}