const express = require("express");
const movieRouter = require("./routes/movie.route");
const app = express();
const PORT = 5051;
app.use(express.json());


app.use('/movies' , movieRouter)


app.listen(PORT , ()=> {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
