import { useEffect, useReducer, useState } from 'react';
import { Row, Col, Container, Button, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Product from '@/components/react/ecommerce/Product';
import MessageBox from '@/components/react/utils/MessageBox';
import LoadingBox from '@/components/react/utils/LoadingBox';
import "@/assets/css/ecommerce.css";
import { SERVER_URL } from "@/context/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faGlasses, faHandHoldingHeart, faPlus } from '@fortawesome/free-solid-svg-icons';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}



export default function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  const [title, setTitle] = useState("Featured Products");

  const fetchData = async (category) => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      let result;
      if (category) {
        result = await fetch(`${SERVER_URL}/api/shop/products/category/${category}`);
      } else {
        result = await fetch(`${SERVER_URL}/api/shop/products`);
      }
      const data = await result.json();
      if (!result.ok)
        throw new Error(data.message);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: err.message });
    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  const catButtonStyle = {
    backgroundSize: 'cover',
    filter: 'brightness(60%)',
    backgroundPosition: '50% 25%'
  }
  return (
    <div>
      <Row className='bg-light py-2 px-2'>
        <Col className='' sm={6} md={4} lg={3} >
          <Button className='bg-light fw-bold text-white justify-content-center text-center w-100'
            onClick={() => { fetchData('accessories'); setTitle("Accessories"); }}
            style={{
              backgroundImage: `url(${SERVER_URL}/assets/ecommerce/accessories2.jpg)`,
              ...catButtonStyle
            }
            }>
            <FontAwesomeIcon icon={faGlasses} className="mx-auto" style={{ filter: 'none' }} size="2xl" />
            <p className='lead mx-auto'>Accessories</p>
          </Button>
        </Col>
        <Col sm={6} md={4} lg={3} >
          <Button className='bg-white fw-bold text-white justify-content-center text-center w-100'
            onClick={() => { fetchData('sanitary'); setTitle("Sanitary"); }}
            style={{
              backgroundBlendMode: 'multiply',
              backgroundImage: `
    url(${SERVER_URL}/assets/ecommerce/sanitary.jpeg),linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8) )`,
              backgroundSize: 'cover'
            }
            }>
            <FontAwesomeIcon icon={faHandHoldingHeart} className="mx-auto" size="2xl" />
            <p className='lead mx-auto' >Sanitary</p>
          </Button>
        </Col>
        <Col sm={6} md={4} lg={3} >
          <Button className='bg-light fw-bold text-white justify-content-center text-center w-100'
            onClick={() => { fetchData('food'); setTitle("Food"); }}
            style={{
              backgroundImage: `url(${SERVER_URL}/assets/ecommerce/petfood.jpg)`,
              ...catButtonStyle
            }
            }>
            <FontAwesomeIcon icon={faBowlFood} className="mx-auto" size="2xl" />
            <p className='lead mx-auto'>Pet Food</p>
          </Button>
        </Col>
        <Col sm={6} md={4} lg={3} >
          <Button className='bg-light fw-bold text-white justify-content-center text-center w-100'
            onClick={() => { fetchData(); setTitle("Featured Products"); }}
            style={{
              backgroundImage: `url(${SERVER_URL}/assets/ecommerce/more.jpg)`,
              ...catButtonStyle
            }
            }>
            <FontAwesomeIcon icon={faPlus} className="mx-auto" size="2xl" />
            <p className='lead mx-auto'>More</p>
          </Button>
        </Col>
      </Row>
      <Container>
        <Helmet>
          <title>Shop</title>
        </Helmet>
        <h1> {title} </h1>
        <div className="products">
          {
            loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant='danger'>{error}</MessageBox>
            ) : (
              <Row>
                {
                  products.map(product => (
                    <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                      <Product product={product}></Product>
                    </Col>
                  ))}
              </Row>
            )
          }
        </div>
      </Container>
    </div>
  )
}
