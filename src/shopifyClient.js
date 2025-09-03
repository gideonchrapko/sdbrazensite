// New Shopify Storefront Cart API client
import { mockProducts, mockCart, mockShop } from './mockData';

const SHOPIFY_STOREFRONT_ACCESS_TOKEN = '7139a1b0c3a5fec6dd28f380632ffbd7';
const SHOPIFY_DOMAIN = 'dabrazn1.myshopify.com';
const API_VERSION = '2024-01';

// Use the Shopify Storefront API URL with proxy for CORS handling
const STOREFRONT_API_URL = `/api/${API_VERSION}/graphql.json`;

// Flag to enable/disable mock mode for development
const USE_MOCK_DATA = false; // Set to false to use real Shopify data

class ShopifyClient {
  constructor() {
    this.accessToken = SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    this.domain = SHOPIFY_DOMAIN;
    this.apiUrl = STOREFRONT_API_URL;
  }

  async request(query, variables = {}) {
    try {
      console.log('Making API request to:', this.apiUrl);
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': this.accessToken,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      console.log('API response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response data:', data);

      if (data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
      }

      return data.data;
    } catch (error) {
      console.log('API request failed:', error.message);
      // If API call fails, return null to trigger mock data fallback
      return null;
    }
  }

  // Create a new cart
  async createCart() {
    if (USE_MOCK_DATA) {
      return { ...mockCart };
    }

    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            createdAt
            updatedAt
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        altText
                      }
                      product {
                        id
                        title
                        handle
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {},
    };

    try {
      const data = await this.request(query, variables);
      
      if (data.cartCreate.userErrors.length > 0) {
        throw new Error(`Cart creation failed: ${JSON.stringify(data.cartCreate.userErrors)}`);
      }

      return data.cartCreate.cart;
    } catch (error) {
      return { ...mockCart };
    }
  }

  // Add line items to cart
  async addLineItems(cartId, lineItems) {
    const query = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            createdAt
            updatedAt
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        altText
                      }
                      product {
                        id
                        title
                        handle
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      cartId,
      lines: lineItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      })),
    };

    const data = await this.request(query, variables);
    
    if (data.cartLinesAdd.userErrors.length > 0) {
      throw new Error(`Add line items failed: ${JSON.stringify(data.cartLinesAdd.userErrors)}`);
    }

    return data.cartLinesAdd.cart;
  }

  // Update line item quantity
  async updateLineItems(cartId, lineItems) {
    const query = `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            createdAt
            updatedAt
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        altText
                      }
                      product {
                        id
                        title
                        handle
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      cartId,
      lines: lineItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };

    const data = await this.request(query, variables);
    
    if (data.cartLinesUpdate.userErrors.length > 0) {
      throw new Error(`Update line items failed: ${JSON.stringify(data.cartLinesUpdate.userErrors)}`);
    }

    return data.cartLinesUpdate.cart;
  }

  // Remove line items from cart
  async removeLineItems(cartId, lineItemIds) {
    const query = `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            createdAt
            updatedAt
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        altText
                      }
                      product {
                        id
                        title
                        handle
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      cartId,
      lineIds: lineItemIds,
    };

    const data = await this.request(query, variables);
    
    if (data.cartLinesRemove.userErrors.length > 0) {
      throw new Error(`Remove line items failed: ${JSON.stringify(data.cartLinesRemove.userErrors)}`);
    }

    return data.cartLinesRemove.cart;
  }

  // Get cart by ID
  async getCart(cartId) {
    const query = `
      query getCart($id: ID!) {
        cart(id: $id) {
          id
          createdAt
          updatedAt
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                    product {
                      id
                      title
                      handle
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
        }
      }
    `;

    const variables = { id: cartId };
    const data = await this.request(query, variables);
    return data.cart;
  }

  // Get all products
  async getProducts(first = 50) {
    if (USE_MOCK_DATA) {
      return mockProducts;
    }

    const query = `
      query getProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 10) {
                edges {
                  node {
                    id
                    url
                    altText
                  }
                }
              }
              variants(first: 100) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const variables = { first };
    
    try {
      const data = await this.request(query, variables);
      return data.products.edges.map(edge => edge.node);
    } catch (error) {
      return mockProducts;
    }
  }

  // Get product by handle
  async getProduct(handle) {
    if (USE_MOCK_DATA) {
      return mockProducts.find(p => p.handle === handle) || mockProducts[0];
    }

    const query = `
      query getProduct($handle: String!) {
        product(handle: $handle) {
          id
          title
          handle
          description
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    `;

    const variables = { handle };
    
    try {
      const data = await this.request(query, variables);
      return data.product;
    } catch (error) {
      return mockProducts.find(p => p.handle === handle) || mockProducts[0];
    }
  }

  // Get shop information
  async getShop() {
    if (USE_MOCK_DATA) {
      return mockShop;
    }

    const query = `
      query getShop {
        shop {
          id
          name
          description
          primaryDomain {
            url
          }
        }
      }
    `;

    try {
      const data = await this.request(query);
      return data.shop;
    } catch (error) {
      return mockShop;
    }
  }
}

// Create and export a singleton instance
const shopifyClient = new ShopifyClient();
export default shopifyClient;
