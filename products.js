const express = require("express");
const router = express.Router();
const NotFoundError = require("./NotFoundError")

let products = [
    {id: 1, name: "ps5", price: 5000},
    {id: 2, name: "xbox", price: 3000},
    {id: 3, name: "switch", price:2299.99}
]


const withAuth = (req,res, next)=>{
    const auth = req.headers.authorization;
    if (auth === "token valido") return next();
    res.status(401).send();
} //criando função que vai atuar como middleware (somente no post requisições) de verificação de token de autorização


router.get("/products", (req, res)=> {
    res.json({
        products: products
    })
}); //configurando retorno da página products


router.post("/products", withAuth, (req, res) =>{
    const product = req.body;
    product.id = products.length +1;
    products.push(product);
    res.json({status: "ok"});
});


router.put("/products/:id", (req, res)=>{ //id passando como parâmetro variável no endereço
    const id = Number(req.params.id); //parâmetro vem como string e precisa ser convertido como número
    const product = products.find(product=>{
            return (product.id === id);
        });
    if (!product) throw new NotFoundError("product")
    product.name = req.body.name;
    product.price = req.body.price;
    res.json({status: "ok"});
 });



router.delete("/products/:id", (req, res)=>{
    const id = Number(req.params.id);
    products = products.filter((product) =>{ 
        return product.id !== id; //neste caso, o filtro mantém no array todos os itens que nao tiverem o mesmo id informado
    });

    res.json({status:"ok"})
})

module.exports = router;
