import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL;
        const res = await fetch(`${API_URL}/api/products/`);
        if (!res.ok) throw new Error("HTTP Error " + res.status);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existing = JSON.parse(localStorage.getItem('cart')) || [];
    existing.push(product);
    localStorage.setItem('cart', JSON.stringify(existing));
    alert('Added to cart!');
  };

  return (
    <div className="products-page">
      <h2>Our Products</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
