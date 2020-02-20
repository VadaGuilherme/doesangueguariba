const express = require("express")
const server = express()
const nunjuks = require("nunjucks")

server.use(express.static('public'))

server.use(express.urlencoded({ extended: true }));

const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '',
    host: '',
    port: 5432,
    database: 'doe'
})

nunjuks.configure("./", {
    express: server,
    noCache: true,
})

server.get("/", function(req, res) {
    const query = "SELECT * FROM donors"

    db.query(query, function(err, result){
        if(err) return res.send("Erro ao listar donors.")

        const donors = result.rows
        return res.render("index.html", { donors })
    })
})

server.post("/", function(req, res){
    const name = req.body.name
    const blood = req.body.blood
    const cellphone = req.body.cellphone

    if(name == "" || cellphone == "" || blood == "") {
        return res.send("Todos os campos sao obrigatorios.")
    }

    const query = `
        INSERT INTO donors ("name", "cellphone", "blood") 
        VALUES ($1, $2, $3)`

    const values = [name, cellphone, blood]

    db.query(query, values, function(err) {
        if(err) return res.send("Erro ao cadastrar donors.")

        return res.redirect("/")
    })
})

server.listen(3000, function() {
    console.log("Iniciei o servidor")
})