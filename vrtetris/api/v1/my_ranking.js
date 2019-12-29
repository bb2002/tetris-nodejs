var myRanking = {}

myRanking.get = function(req, res) {
    // TODO something...
    // score 의 값에 기반하여 서버의 랭킹을 불러온다.
    console.log("my_ranking.get is request.")
    console.log(req.query.score)

    let response = {
        ranking: 16
    }
    res.send(response)
}

myRanking.post = function(req, res) {
    // TODO something...
    // req.body 를 파싱하여 DB 에 점수를 저장
    console.log("my_ranking.post is request.")
    console.log(req.body)
    res.sendStatus(200)
}

module.exports = myRanking