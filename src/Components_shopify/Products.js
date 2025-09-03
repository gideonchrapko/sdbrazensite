import { useEffect } from 'react';
import { useShopify } from '../hooks';
import { Container, Row } from 'react-bootstrap';
import { Product } from './Product';

export default function ProductsPage(props) {
  const { products, fetchProduct } = useShopify();
  const id = 'id';

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  return (
    <Container
      fluid
      style={{
        zIndex: '10',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <Row>
        {products &&
          products.map((product, i) => {
            const image = product.images?.edges?.[0]?.node?.url || '/placeholder-image.jpg';
            const price = product.variants?.edges?.[0]?.node?.price?.amount || '0';
            const description =
              product.description && product.description.split('.');
            return (
              <Product
                i={i}
                key={i}
                image={image}
                price={price}
                description={description}
                product={product}
              />
            );
          })}
      </Row>
    </Container>
  );
}
