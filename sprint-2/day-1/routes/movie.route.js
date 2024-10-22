const { Router } = require("express");

const movieRouter = Router();
movieRouter.get("/", (req, res) => {
  return res.json({
    list: [1, 2, 3, 4, 5],
  });
});

module.exports = movieRouter;
