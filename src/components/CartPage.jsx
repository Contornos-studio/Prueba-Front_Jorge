import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="product-detail-container">

        <h2>Tu carrito está vacío</h2>
        <Link to="/">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Carrito de compras</h2>
      <ul className="cart-container" style={{ listStyle: 'none', padding: 0 }}>
  {cartItems.map((item) => (
    <li key={item.id} className="cart-item">
      <div className="cart-item-info">
        <h4>{item.title}</h4>
        <p>Precio unitario: ${item.price.toFixed(2)}</p>
        <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <div className="cart-item-actions">
        <button onClick={() => decreaseQuantity(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => increaseQuantity(item.id)}>+</button>
        <button onClick={() => removeFromCart(item.id)}>🗑️</button>
      </div>
    </li>
  ))}
</ul>

      <h3>Total: ${total.toFixed(2)}</h3>
      <Link to="/pago">
        <button style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Ir al pago</button>
      </Link>
    </div>
  );
};

export default CartPage;
