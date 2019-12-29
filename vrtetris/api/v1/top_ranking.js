var topRanking = {}

topRanking.get = function(req, res) {
    // TODO something...
    // 서버에서 랭크 1000개를 들고 온다.
    console.log("top_ranking.get is request.")
    console.log(req.body)

    let data = {
        ranking: [
            {
                name: "Ballbot",
                score: 1048576,
                rank: 1
            },
            {
                name: "Saltypie",
                score: 1048575,
                rank: 2
            },
            {
                name: "ATLAS",
                score: 1048510,
                rank: 3
            }
        ]
    }
    res.send(data)
}

topRanking.post = function(req, res) {
    // TODO something...
    res.sendStatus(404)
}

module.exports = topRanking