// Mock data for development when Shopify API is not accessible due to CORS
export const mockProducts = [
  {
    id: 'gid://shopify/Product/1',
    title: 'Sample Product 1',
    handle: 'sample-product-1',
    description: 'This is a sample product for development.',
    images: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductImage/1',
            url: 'https://picsum.photos/400/400?random=1',
            altText: 'Sample Product 1'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/1',
            title: 'Default Title',
            availableForSale: true,
            price: {
              amount: '29.99',
              currencyCode: 'USD'
            },
            image: {
              url: 'https://picsum.photos/400/400?random=1',
              altText: 'Sample Product 1'
            }
          }
        }
      ]
    }
  },
  {
    id: 'gid://shopify/Product/2',
    title: 'Sample Product 2',
    handle: 'sample-product-2',
    description: 'This is another sample product for development.',
    images: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductImage/2',
            url: 'https://picsum.photos/400/400?random=2',
            altText: 'Sample Product 2'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/2',
            title: 'Small',
            availableForSale: true,
            price: {
              amount: '39.99',
              currencyCode: 'USD'
            },
            image: {
              url: 'https://picsum.photos/400/400?random=2',
              altText: 'Sample Product 2'
            }
          }
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/3',
            title: 'Medium',
            availableForSale: true,
            price: {
              amount: '39.99',
              currencyCode: 'USD'
            },
            image: {
              url: 'https://picsum.photos/400/400?random=2',
              altText: 'Sample Product 2'
            }
          }
        }
      ]
    }
  },
  {
    id: 'gid://shopify/Product/3',
    title: 'Sample Product 3',
    handle: 'sample-product-3',
    description: 'This is a third sample product for development.',
    images: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductImage/3',
            url: 'https://picsum.photos/400/400?random=3',
            altText: 'Sample Product 3'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/4',
            title: 'Large',
            availableForSale: true,
            price: {
              amount: '49.99',
              currencyCode: 'USD'
            },
            image: {
              url: 'https://picsum.photos/400/400?random=3',
              altText: 'Sample Product 3'
            }
          }
        }
      ]
    }
  }
];

export const mockCart = {
  id: 'gid://shopify/Cart/mock-cart-id',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  lines: {
    edges: []
  },
  cost: {
    totalAmount: {
      amount: '0.00',
      currencyCode: 'USD'
    },
    subtotalAmount: {
      amount: '0.00',
      currencyCode: 'USD'
    }
  },
  checkoutUrl: '#'
};

export const mockShop = {
  id: 'gid://shopify/Shop/1',
  name: 'Sample Shop',
  description: 'This is a sample shop for development.',
  primaryDomain: {
    url: 'https://sample-shop.myshopify.com'
  }
};
