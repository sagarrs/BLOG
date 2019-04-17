const {User} = require("../models/user")

const authenticateUser = function(req, res, next){ 
        // if(token){
        // "findByToken" is to check if the token provided by user is
        // valid / not n to check if the token belongs to a particular user
        const token = req.header("x-auth")
        User.findByToken(token)
            .then((user) => {
                // to make the user obj accessible accross the controller
                // in controller where we r calling "authenticateUser", "user"
                // can be accessed using "req"
                if(user){
                    req.user = user
                    req.token = token
                    // next is used coz we can't send anything to frontend directly
                    // from here coz there might be some logic that needs to be 
                    // executed in controller after this, hence we provide the control
                    // back to route in controller in this case "accounts" using next()
                    next()
                }else{
                    res.status("404").send({notice: "token not available"})
                }
            })
            .catch((err) => {
                res.status("401").send(err)
            })
        // }else{
        //     res.status("401").send("failure")
        // }
}

module.exports = {
    authenticateUser
}