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
      <Link to="/">
        <img src="https://exitocol.vtexassets.com/assets/vtex.file-manager-graphql/images/87172d18-1b44-4a1b-b381-f8f8b899f8f4___66042c9ea5de649a565802cc12e64967.svg" alt="" 
        className='logo'/>
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='barrabuscador'
         
        />
        <button className='boton' type="submit">Buscar</button>
      </form>

      <Link to="/carrito" style={{ color: '#fff', textDecoration: 'none' }}>
        🛒 Carrito ({totalItems})
      </Link>
    </header>
  );
};

export default Header;
