const express = require("express"); //importando o módulo

const server = express(); //intanciando o módulo

server.get("/", (req, res)=> {
    res.send("Hello World!!!!");
}); //configurando um get para página principal /



module.exports = server;