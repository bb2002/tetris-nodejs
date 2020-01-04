const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const shortid = require("shortid")

const PORT = 9902

//#region db setting

const adapter = new FileSync(__dirname+"/db/db.json")
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
app.use('/static', express.static(path.join(__dirname, "../public")))

//#endregion


//#region GET route

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/index.html"))
})

//#endregion


//#region API GET route

app.get("/api/v1/my_ranking", (req, res) => {
    const reqScore = req.query.score
    const results = db.get("user")
                        .sortBy("score")
                        .value()
    const sortResults = results.reverse()
    let ranking
    
    sortResults.forEach((result, index) => {
        if(result.score == reqScore){
            ranking = index + 1
        }
    })
    if(ranking>99999){
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
    let resultObj = {
        ranking :[]
    }

    sortResults.forEach((result, index) => {
        result.rank = index + 1
        resultObj.ranking[index] = result
    })
    
    resultObj.ranking = resultObj.ranking.slice(0,1000)
    
    res.status(200).json(resultObj)
})

//#endregion


//#region API POST route

app.post("/api/v1/my_ranking", (req, res) => {
    const reqName = req.body.Name
    const reqScore = req.body.Score
    db.get("user")
        .push({
            id: shortid.generate(),
            name: reqName,
            score: reqScore
        })
        .write()
    res.status(200).send()
})

app.post("/api/v1/top_ranking", (req, res) => {
    

    res.status(404).send("404 NOT FOUND..")
})

//#endregion


app.listen(PORT, () => {
    console.log(`VR Tetris 서버가 기동되었습니다. port : ${PORT}`)
})