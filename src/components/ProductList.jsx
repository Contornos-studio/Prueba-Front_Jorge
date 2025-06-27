import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext); 
  const [cantidades, setCantidades] = useState({});

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

const productosFiltrados = products.filter(product =>
  product.title.toLowerCase().includes(searchQuery.toLowerCase())
);
const handleCantidadChange = (id, value) => {
  setCantidades(prev => ({ ...prev, [id]: parseInt(value) }));
};

const getCantidad = (id) => {
  return cantidades[id] || 1;
};



  return (
  <div className="product-grid">

      {productosFiltrados.map(product => (
       <div key={product.id} className="product-card">

          <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={product.image} alt={product.title} style={{ height: '150px', objectFit: 'contain', width: '100%' }} />
            <h3 style={{ fontSize: '1rem', marginTop: '0.5rem' }}>{product.title}</h3>
            <p style={{ color: '#333' }}>${product.price}</p>
          </Link>
          <div style={{ marginTop: '0.5rem' }}>
  <input
    type="number"
    min="1"
    value={getCantidad(product.id)}
    onChange={(e) => handleCantidadChange(product.id, e.target.value)}
    style={{ width: '50px', marginRight: '0.5rem' }}
  />
  <button onClick={() => addToCart(product, getCantidad(product.id))}>
    Agregar al carrito
  </button>
</div>

        </div>
      ))}
    </div>
  );
};

export default ProductList;
