var express = require('express');
var router = express.Router();

let myRanking = require("./my_ranking")
let topRanking = require("./top_ranking")

router.get("/my_ranking", myRanking.get)
router.post("/my_ranking", myRanking.post)
router.get("/top_ranking", topRanking.get)
router.post("/top_ranking", topRanking.post)

module.exports = router