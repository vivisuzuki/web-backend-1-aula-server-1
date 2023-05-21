const express = require("express"); //importando o módulo

const server = express(); //intanciando o módulo

server.use(express.json()) //fazendo parse para arquivo json


let products = [
    {id: 1, name: "ps5", price: 5000},
    {id: 2, name: "xbox", price: 3000},
    {id: 3, name: "switch", price:2299.99}
]


server.get("/", (req, res)=> {
    res.send("Hello World!!!!");
}); //configurando um get para página principal /

server.get("/products", (req, res)=> {
    res.json({
        products: products
    })
}); //configurando retorno da página products


server.post("/products", (req, res) =>{
    const product = req.body;
    product.id = products.length +1;
    products.push(product);
    res.json({status: "ok"});
});


server.put("/products/:id", (req, res)=>{ //id passando como parâmetro variável no endereço
    const id = Number(req.params.id); //parâmetro vem como string e precisa ser convertido como número
    products.forEach(product=>{
        if(product.id === id) {
            product.name = req.body.name;
            product.price = req.body.price;
        }
    })
    res.json({status: "ok"});
});


server.delete("/products/:id", (req, res)=>{
    const id = Number(req.params.id);
    products = products.filter((product) =>{ 
        return product.id !== id; //neste caso, o filtro mantém no array todos os itens que nao tiverem o mesmo id informado
    });

    res.json({status:"ok"})
})


module.exports = server;