var express = require("express")
var app = express()

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(9902, () => {
    console.log("VR Tetris 서버가 기동되었습니다.")
})