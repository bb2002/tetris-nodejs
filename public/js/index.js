const rankingDiv = document.getElementById("topRanking")
const xhr = new XMLHttpRequest();
const url = "http://localhost:9902/api/v1/top_ranking"
const method = "GET"
xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
            let results = xhr.responseText
            results = JSON.parse(results)
            console.log(results)
            results = results.ranking
            console.log(results)
            results.forEach(result => {
                let resultEl = document.createElement("div")
                resultEl.setAttribute("id", `ranking${result.rank}`)
                resultEl.innerHTML = `<span class="rankSpan" id="rank${result.rank}">${result.rank}등</span><span class="nameSpan" id="name${result.rank}">${result.name}</span><span class="scoreSpan" id="score${result.rank}">${result.score}점</span>`
                rankingDiv.appendChild(resultEl)
            });
        } else {
            console.error(xhr.responseText)
        }
    }
}
xhr.open(method, url)
xhr.send()
