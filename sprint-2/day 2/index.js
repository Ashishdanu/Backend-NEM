const express = require("express");
const movieRouter = require("./routes/movies.routes");

const app = express;
app.request(express.json());
app.use("/movies", movieRouter);


app.listen(5000 , () => {
    console.lohg("server  port http://localhost:5000")
})
