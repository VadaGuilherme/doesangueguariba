const express = require("express")
const server = express()
const nunjuks = require("nunjucks")

server.use(express.static('public'))

server.use(express.urlencoded({ extended: true }));

nunjuks.configure("./", {
    express: server,
    noCache: true,
})

const donors = [
    {
        name: "1",
        blood: "1",
    },
    {
        name: "2",
        blood: "2",
    },
    {
        name: "3",
        blood: "3",
    },
    {
        name: "4",
        blood: "4",
    },
]

server.get("/", function(req, res) {
    return res.render("index.html", { donors })
})

server.post("/", function(req, res){
    const name = req.body.name
    const blood = req.body.blood
    const cellphone = req.body.cellphone

    donors.push({
        name: name,
        blood: blood,
    })

    return res.redirect("/")
})

server.listen(3000, function() {
    console.log("Iniciei o servidor")
})