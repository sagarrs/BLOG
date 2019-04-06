const bcryptjs = require("bcryptjs")

const pwd = "user12345"

bcryptjs.genSalt(10)
    .then((salt) => {
        bcryptjs.hash(pwd, salt)
            .then((encryptedPwd) => {
                console.log(encryptedPwd)
            })
            .catch((err) => {
                console.log(err)
            })
    })
    .catch((err) => {
        console.log(err)
    })