const server = require("./server")

const port = 8080; //definindo a porta do servidor

server.listen(port, ()=> {
    console.log(`server rodando na porta ${port}`);
});