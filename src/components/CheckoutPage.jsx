import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const [compraExitosa, setCompraExitosa] = useState(false);

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulación de pago
        setCompraExitosa(true);
        clearCart();
        // Vacía el carrito (opcional)
    };

    if (compraExitosa) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>¡Gracias por tu compra! 🛍️</h2>
                <p>Tu pedido ha sido procesado correctamente.</p>
                <Link to="/">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="checkout-container">
  <h2>Finalizar compra</h2>

  <form onSubmit={handleSubmit} className="checkout-form">
    <div className="form-group">
      <label>Nombre completo:</label>
      <input type="text" required />
    </div>

    <div className="form-group">
      <label>Dirección de envío:</label>
      <input type="text" required />
    </div>

    <div className="form-group">
      <label>Número de tarjeta:</label>
      <input type="text" placeholder="0000 0000 0000 0000" required />
    </div>

    <div className="form-group">
      <label>Fecha de expiración:</label>
      <input type="text" placeholder="MM/AA" required />
    </div>

    <div className="form-group">
      <label>CVV:</label>
      <input type="text" placeholder="123" required />
    </div>

    <div className="total-pago">
      <p>Total a pagar: <strong>${total.toFixed(2)}</strong></p>
    </div>

    <button type="submit" className="pagar-btn">Pagar ahora</button>
  </form>
</div>

    );
};

export default CheckoutPage;
