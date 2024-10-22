const {Router} = require("express");
const movieRouter = Router();

movieRouter.get("/" , (req, res)=> {
    return res.json([]);
})


movieRouter.get("/:id" , (req , res)=> {
    
})