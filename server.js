const express = require("express"); //importando o módulo
const productRouter = require("./products"); //importando a rota dos produtos
const NotFoundError = require("./NotFoundError");

const server = express(); //intanciando o módulo

server.use(express.json()); //fazendo parse para arquivo json
server.use((req, res, next) => {
    console.log("time: " + new Date().toISOString());
    next(); //chamando a próxima função
}) //criando middleware global (todo servidor vai utilizar) de log de hora quando houver requisição


server.use(productRouter); //configurando o servidor para utilizar a rota dos produtos

server.get("/", (req, res)=> {
    res.send("Hello World!!!!");
}); //configurando um get para página principal /

server.use((err, req, res, next) =>{
    console.error(">>>>> " + err);
    next(err);
})


server.use((err, req, res, next) =>{
    if (err instanceof NotFoundError) return res.status(404).json({message: err.message});
    res.status(500).json({message: "Internal Server Error"});
})


module.exports = server;
