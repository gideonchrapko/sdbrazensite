import React from 'react';

import Footer from './HeaderNew';
import '../Styles/Home.css';
import ProductList from '../Components_shopify/ProductList';

const Home = () => {
  return (
    <div style={{ overflow: 'scroll' }}>
      <div>
        <ProductList />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
