const validateQueryParams = (req, res, next) => {
    const { name, age } = req.query;
  
    if (age && isNaN(parseInt(age, 10))) {
      return res.status(400).json({ error: 'Age must be a number' });
    }
  
    next();
  };
  
  module.exports = { validateQueryParams };
  