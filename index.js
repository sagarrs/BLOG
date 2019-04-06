const express = require("express")
var cors = require("cors")
const {mongoose} = require("./config/database")
const {userRouter} = require("./app/controllers/usersController")
const {storyRouter} = require("./app/controllers/storiesController")
const port = 3005

const app = express()

// "use" is to configure express middleware
app.use(express.json())
app.use(cors())

app.get("/", function(req, res){
    res.send("<h1>Welcome To New Blog</h1>")
})

app.use("/users", userRouter)
app.use("/stories", storyRouter)

app.listen(port, function(){
    console.log("Listening on port", port)
})