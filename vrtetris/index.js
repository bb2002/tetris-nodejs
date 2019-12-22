var express = require("express")
var app = express()
var path = require("path")

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/index.html"))
})

app.listen(9902, () => {
    console.log("VR Tetris 서버가 기동되었습니다. port : 9902")
})