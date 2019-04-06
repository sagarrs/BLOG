const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
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
                                return Promise.reject(result)
                            }
                        })
            })
            .catch(function(err){
                return Promise.reject(err)
            })
}

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}