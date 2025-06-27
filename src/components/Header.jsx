import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Header = ({ onSearch }) => {
  const { cartItems } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // manda búsqueda a ProductList
    if (location.pathname !== '/') navigate('/');
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
        🛍️ Mi Tienda
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '0.3rem 0.5rem', borderRadius: '4px', marginRight: '0.5rem' }}
        />
        <button type="submit">Buscar</button>
      </form>

      <Link to="/carrito" style={{ color: '#fff', textDecoration: 'none' }}>
        🛒 Carrito ({totalItems})
      </Link>
    </header>
  );
};

export default Header;
