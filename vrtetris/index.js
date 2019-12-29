var express = require("express")
var app = express()
var path = require("path")

// Express settings...
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
////////////////////

// Import API router
let rankingAPIv1 = require("./api/v1")
app.use("/api/v1", rankingAPIv1)
////////////////////

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/index.html"))
})

app.listen(9902, () => {
    console.log("VR Tetris 서버가 기동되었습니다. port : 9902")
})