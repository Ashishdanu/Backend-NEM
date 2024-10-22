app.get('/products', async (req, res) => {
    const { name, minPrice, maxPrice } = req.query;
  
    const where = {};
    if (name) where.name = { [Sequelize.Op.like]: `%${name}%` };
    if (minPrice) where.price = { [Sequelize.Op.gte]: minPrice };
    if (maxPrice) where.price = { [Sequelize.Op.lte]: maxPrice };
  
    try {
      const products = await Product.findAll({ where });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get('/products', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
  
    // Previous search/filter code here...
  
    try {
      const products = await Product.findAll({ where, limit, offset });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  