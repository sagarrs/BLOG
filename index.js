const express = require("express")
var cors = require("cors")
const {mongoose} = require("./config/database")
const {userRouter} = require("./app/controllers/usersController")
const port = 3005

const app = express()

// "use" is to configure express middleware
app.use(express.json())
app.use(cors())

// app.get("/", function(req, res){
//     res.send("<h1>Welcome To New Blog</h1>")
// })

app.use("/", userRouter)

app.listen(port, function(){
    console.log("Listening on port", port)
})