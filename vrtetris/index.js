const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const lowdb = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")

const PORT = 9902
const adapter = new FileSync("db.json")
const db = low(adapter)

//#region middleware

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static("public"))

//#endregion


//#region GET route

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/index.html"))
})

app.get("/api/v1/ranking", (req, res) => {
    res.json({
        "message": "test"
    })
})

app.get("/api/v1/my_ranking", (req, res) => {
    res.json()
})

app.get("/api/v1/top_ranking", (req, res) => {
    res.json()
})

//#endregion


//#region POST route

app.post("/api/v1/ranking", (req, res) => {
    const testMessage = req.body.message;
    res.json({
        "message": testMessage
    });
})

app.post("/api/v1/my_ranking", (req, res) => {
    res.json()
})

app.post("/api/v1/top_ranking", (req, res) => {
    res.json()
})

//#endregion


app.listen(PORT, () => {
    console.log(`VR Tetris 서버가 기동되었습니다. port : ${PORT}`)
})