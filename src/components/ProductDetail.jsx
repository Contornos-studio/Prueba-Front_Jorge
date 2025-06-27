import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar el producto:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
  <div className="product-detail-container">
    <div className="product-detail-info">
      <Link to="/" style={{ textDecoration: 'none' }}>&larr; Volver a la tienda</Link>
    </div>

   <h2 className="product-detail-title">{product.title}</h2>
    <img src={product.image} alt={product.title} className="product-detail-image" />

    <p><strong>Precio:</strong> ${product.price}</p>

    {product.rating && (
      <p><strong>Calificación:</strong> ⭐ {product.rating.rate} ({product.rating.count} reseñas)</p>
    )}

    <p><strong>Descripción:</strong> {traducir(product.description)}</p>
    <p><strong>Categoría:</strong> {product.category}</p>

    <div style={{ marginTop: '1rem' }}>
  <label htmlFor="cantidad">Cantidad:</label>
  <input
    type="number"
    id="cantidad"
    min="1"
    value={cantidad}
    onChange={(e) => setCantidad(parseInt(e.target.value))}
    style={{ width: '60px', marginLeft: '0.5rem' }}
  />
  <button onClick={() => addToCart(product, cantidad)} style={{ marginLeft: '1rem' }}>
    Agregar al carrito
  </button>
</div>
  </div>
);

};

// Traducción rápida usando una función simple (puedes mejorarla luego)
function traducir(texto) {
  const traducciones = {
    "men's clothing": "ropa de hombre",
    "women's clothing": "ropa de mujer",
    "jewelery": "joyería",
    "electronics": "electrónica",
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops": "Mochila Fjallraven - Foldsack No. 1 para portátiles de hasta 15\"",
    "Your perfect pack for everyday use and walks in the forest.": "Tu mochila perfecta para uso diario y caminatas en el bosque.",
    // ... puedes agregar más traducciones específicas aquí
  };

  return traducciones[texto] || texto;
}

export default ProductDetail;
