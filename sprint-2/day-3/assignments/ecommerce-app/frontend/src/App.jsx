import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard';
import './App.css'

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('http://localhost:4500/products');
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1>Products</h1>
      <div className="product-grid">
        {currentProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
