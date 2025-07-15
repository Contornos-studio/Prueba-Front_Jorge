import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';



const ProductList = ({ searchQuery = '' }) => {
  const { addToCart } = useContext(CartContext);

  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loadCount, setLoadCount] = useState(8);
  const [cantidades, setCantidades] = useState({});

  // Cargar productos y duplicarlos
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then(res => res.json())
      .then(data => {
        // Mezclar aleatoriamente
        const shuffled = data.sort(() => 0.5 - Math.random());

        // Duplicar y dar IDs únicos si lo necesitas
        const duplicated = [...shuffled, ...shuffled, ...shuffled].map((item, index) => ({
          ...item,
          id: `${item.id}-${index}`
        }));

        setAllProducts(duplicated);
        setVisibleProducts(duplicated.slice(0, loadCount));
      });
  }, []);

  // Scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (bottom && visibleProducts.length < allProducts.length) {
        const nextCount = loadCount + 4;
        setLoadCount(nextCount);
        setVisibleProducts(allProducts.slice(0, nextCount));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadCount, visibleProducts, allProducts]);

  // Función para actualizar cantidad
  const handleCantidadChange = (id, value) => {
    setCantidades(prev => ({
      ...prev,
      [id]: Math.max(1, parseInt(value)) // mínimo 1
    }));
  };

  const getCantidad = (id) => {
    return cantidades[id] || 1;
  };

  // Filtro por búsqueda (opcional)
  const productosFiltrados = visibleProducts.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={4000}
        arrows={true}
      >
        <div>
          <img className="slider"
            src="https://exitocol.vtexassets.com/assets/vtex.file-manager-graphql/images/d0daaf0f-dacc-417a-87e2-e691cca48bbd___c804ef06b44af4ea9e2eee3b8deed5ba.jpg"
            alt="Banner 1"


          />
          <img className="slidermb"
            src="https://exitocol.vtexassets.com/assets/vtex.file-manager-graphql/images/3cc6abcc-e9d6-4c3b-8a32-4b4fb6de7341___12b1e99a28838ddc9d6c4975d94d3159.jpg"
            alt="Banner 1"


          />
        </div>
        <div>
          <img className="slider"
            src="https://exitocol.vtexassets.com/assets/vtex.file-manager-graphql/images/cdb9aeee-c389-4d60-85e3-71696399b409___c839d71e09cf6ce759caea0c0fc6d3fa.jpg"
            alt="Banner 2"

          />
          <img className="slidermb"
            src="https://exitocol.vtexassets.com/assets/vtex.file-manager-graphql/images/bcbacfc5-383c-4478-80d2-df25ffed7304___a7a0a67b24516256cbe3c58c62b051dc.jpg"
            alt="Banner 1"


          />
        </div>
      </Slider>

      <div className="product-grid">
        {productosFiltrados.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/producto/${product.id}`}
              state={{ product }}
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src={product.image}
                alt={product.title}
                style={{ height: '150px', objectFit: 'contain', width: '100%' }}
              />
              <h3 style={{ fontSize: '1rem', marginTop: '0.5rem' }}>{product.title}</h3>
              <p style={{ color: '#333', fontSize:'25px', }}>${product.price}</p>
            </Link>

            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', }}>
              <input
                type="number"
                min="1"
                value={getCantidad(product.id)}
                onChange={(e) => handleCantidadChange(product.id, e.target.value)}
                className="input"
              />
              <button className="boton" onClick={() => addToCart(product, getCantidad(product.id))}>
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div></>
  );
};

export default ProductList;
