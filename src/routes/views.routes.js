import { Router } from "express";
import {productService} from '../dao/index.js'
import { cartService } from "../dao/index.js";
import { checkUserAuthenticated, showLoginView } from "../middlewares/auth.js";

const router = Router();

router.get("/", checkUserAuthenticated, async (req,res) => {
    res.render("home");
});

router.get("/registro", showLoginView, async (req,res) => {
    res.render("signup");
});

router.get("/login", showLoginView, async (req,res) => {
    res.render("login");
});

router.get("/carts/:cid", async (req,res) => {
    const result = await cartService.getCartById(req.params.cid);
    res.render("carts", result);
});

router.get("/products/:pid", async (req,res) => {
    const result = await productService.getProductById(req.params.pid);
    res.render("detail", result);
});

router.get("/products", checkUserAuthenticated, async (req,res) => {
    try {
        //capturar valores de queries
        const {limit=10, page=1, stock, sort="asc", name, price, category} = req.query;

        const stockValue = stock === 0? undefined : parseInt(stock);
        const nameValue = name === ""? undefined : name;
        const priceValue = price === 0? undefined : parseFloat(price);
        const categoryValue = category === 0? undefined : category;

        const sortValue = sort === "asc"? 1:-1;
        if(!["asc","desc"].includes(sort))
            return res.render("products",{error: "Orden no valido"});

        let query = {}
        if(stockValue){
            query.stock = {$gte:stockValue};
        }
        if(nameValue){
            query.name= {$eq:nameValue};
        }
        if(price){
            query.price= {$gte:priceValue};
        }
        if(category){
            query.category= {$eq:categoryValue};
        }

        const result = await productService.getProductsWithPaginate(query,
        {
            page,
            limit,
            sort: {price:sortValue},
            lean: true
        });

        //http://localhost:8080/products
        let baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
        let linkAux = baseUrl.includes("?") ? "&" : "?";
        let pLink;
        if(baseUrl.includes("page"))
            pLink = result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`,`page=${result.prevPage}`)}` : null;
        else
            pLink = baseUrl + `${linkAux}page=${result.prevPage}`;
        let nLink;
        if(baseUrl.includes("page"))
            nLink = result.hasNextPage ? `${baseUrl.replace(`page=${result.page}`,`page=${result.nextPage}`)}` : null;
        else
            nLink = baseUrl + `${linkAux}page=${result.nextPage}`;

        const required = {
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `${pLink}` : null,
            nextLink: result.hasNextPage ? `${nLink}` : null
        };

       res.render("products", {required: required, user: req.user.toJSON()});
    } catch (error) {
        console.log(error);
        res.render("products",{error: "Error al cargar la vista"});
    }
});

export {router as viewsRouter};