const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const shortid = require("shortid")

const PORT = 9902

//#region db setting
const adapter = new FileSync("db.json")
const db = low(adapter)

db.defaults({
        user: []
    })
    .write()

//#endregion


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

app.get("/my_ranking", (req,res)=>{
    res.sendFile(path.join(__dirname, "../public/html/my_ranking.html"))
})

app.get("/top_ranking",(req,res)=>{
    res.sendFile(path.join(__dirname, "../public/html/top_ranking.html"))
})

//#endregion


//#region API GET route

app.get("/api/v1/my_ranking", (req, res) => {
    const reqName = req.query.name
    const results = db.get("user")
                        .sortBy("score")
                        .value()
    const sortResults = results.reverse()
    let ranking
    
    sortResults.forEach((result, index) => {
        if(result.name === reqName){
            ranking = index+1
        }
    });
    if(ranking>5){
        return -1
    }else{
        res.json({
            ranking:ranking
        })
    }
})

app.get("/api/v1/top_ranking", (req, res) => {
    const results = db.get("user")
                        .sortBy("score")
                        .value()
    
    const sortResults = results.reverse()

    res.status(200).json(sortResults.slice(0,1000))
})

//#endregion


//#region API POST route

app.post("/api/v1/my_ranking", (req, res) => {
    const reqName = req.body.name
    const reqScore = req.body.score
    if(db.get("user").find({name: reqName}).value()){
        db.get("user")
            .find({name: reqName})
            .assign({score: reqScore})
            .write()
    }else{
        db.get("user")
            .push({
                name: reqName,
                score: reqScore
            })
            .write()
    }
    res.status(200).send()
})

app.post("/api/v1/top_ranking", (req, res) => {
    

    res.status(404).send("404 NOT FOUND..")
})

//#endregion


app.listen(PORT, () => {
    console.log(`VR Tetris 서버가 기동되었습니다. port : ${PORT}`)
})