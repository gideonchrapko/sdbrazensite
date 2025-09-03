import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import shopifyClient from '../../../shopifyClient';

const PRODUCTS_FOUND = 'shopify/PRODUCTS_FOUND';
const PRODUCT_FOUND = 'shopify/PRODUCT_FOUND';
const COLLECTION_FOUND = 'shopify/COLLECTION_FOUND';
const CART_FOUND = 'shopify/CART_FOUND';
const SHOP_FOUND = 'shopify/SHOP_FOUND';
const ADD_VARIANT_TO_CART = 'shopify/ADD_VARIANT_TO_CART';
const UPDATE_QUANTITY_IN_CART = 'shopify/UPDATE_QUANTITY_IN_CART';
const REMOVE_LINE_ITEM_IN_CART = 'shopify/REMOVE_LINE_ITEM_IN_CART';
const OPEN_CART = 'shopify/OPEN_CART';
const CLOSE_CART = 'shopify/CLOSE_CART';
const CART_COUNT = 'shopify/CART_COUNT';

const initialState = {
  isCartOpen: false,
  cartCount: 0,
  cart: {},
  products: [],
  featured: [],
  product: {},
  shop: {},
};

const shopifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_FOUND:
      return { ...state, products: action.payload };
    case PRODUCT_FOUND:
      return { ...state, product: action.payload };
    case COLLECTION_FOUND:
      return { ...state, featured: action.payload };
    case CART_FOUND:
      return { ...state, cart: action.payload };
    case SHOP_FOUND:
      return { ...state, shop: action.payload };
    case ADD_VARIANT_TO_CART:
      return { ...state, cart: action.payload };
    case UPDATE_QUANTITY_IN_CART:
      return { ...state, cart: action.payload };
    case REMOVE_LINE_ITEM_IN_CART:
      return { ...state, cart: action.payload };
    case OPEN_CART:
      return { ...state, isCartOpen: true };
    case CLOSE_CART:
      return { ...state, isCartOpen: false };
    case CART_COUNT:
      return { ...state, cartCount: action.payload };
    default:
      return state;
  }
};

export default shopifyReducer;

// Gets all the products from Shopify
function getProducts() {
  return async (dispatch) => {
    try {
      const products = await shopifyClient.getProducts();
      dispatch({
        type: PRODUCTS_FOUND,
        payload: products,
      });
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
}

// Gets individual item based on id
function getProduct(handle) {
  return async (dispatch) => {
    try {
      const product = await shopifyClient.getProduct(handle);
      dispatch({
        type: PRODUCT_FOUND,
        payload: product,
      });
      return product;
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };
}

//
// Gets a  collection based on that collection's id
//
// function getCollection() {
// 	const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIwODAyMDYwMzAzMw=="
// 	return (dispatch) => {
// 		client.collection.fetchWithProducts(collectionId).then((resp) => {
// 			dispatch({
// 				type: COLLECTION_FOUND,
// 				payload: resp.products,
// 			})
// 		})
// 	}
// }

// Creates initial cart state from Shopify
function createCart() {
  return async (dispatch) => {
    try {
      const cart = await shopifyClient.createCart();
      dispatch({
        type: CART_FOUND,
        payload: cart,
      });
    } catch (error) {
      console.error('Failed to create cart:', error);
    }
  };
}

// Gets Shopify store information
function shopInfo() {
  return async (dispatch) => {
    try {
      const shop = await shopifyClient.getShop();
      dispatch({
        type: SHOP_FOUND,
        payload: shop,
      });
    } catch (error) {
      console.error('Failed to fetch shop info:', error);
    }
  };
}

// Adds variants to cart
function addVariantToCart(cartId, lineItemsToAdd) {
  return async (dispatch) => {
    try {
      const cart = await shopifyClient.addLineItems(cartId, lineItemsToAdd);
      dispatch({
        type: ADD_VARIANT_TO_CART,
        payload: cart,
      });
      return cart;
    } catch (error) {
      console.error('Failed to add variant to cart:', error);
    }
  };
}

// Updates quantity of line items in cart
function updateQuantityInCart(lineItemId, quantity, cartId) {
  const lineItemsToUpdate = [
    { id: lineItemId, quantity: parseInt(quantity, 10) },
  ];

  return async (dispatch) => {
    try {
      const cart = await shopifyClient.updateLineItems(cartId, lineItemsToUpdate);
      dispatch({
        type: UPDATE_QUANTITY_IN_CART,
        payload: cart,
      });
      return cart;
    } catch (error) {
      console.error('Failed to update quantity in cart:', error);
    }
  };
}

// Removes line item from cart
function removeLineItemInCart(cartId, lineItemId) {
  return async (dispatch) => {
    try {
      const cart = await shopifyClient.removeLineItems(cartId, [lineItemId]);
      dispatch({
        type: REMOVE_LINE_ITEM_IN_CART,
        payload: cart,
      });
    } catch (error) {
      console.error('Failed to remove line item from cart:', error);
    }
  };
}

// To close the cart
function handleCartClose() {
  return {
    type: CLOSE_CART,
  };
}

// To open the cart
function handleCartOpen() {
  return {
    type: OPEN_CART,
  };
}

// Set the count of items in the cart
function handleSetCount(count) {
  return {
    type: CART_COUNT,
    payload: count,
  };
}

export function useShopify() {
  const dispatch = useDispatch();
  const cartStatus = useSelector(
    (appState) => appState.shopifyState.isCartOpen
  );
  const cartCount = useSelector((appState) => appState.shopifyState.cartCount);
  const products = useSelector((appState) => appState.shopifyState.products);
  const product = useSelector((appState) => appState.shopifyState.product);
  const featured = useSelector((appState) => appState.shopifyState.featured);
  const cartState = useSelector(
    (appState) => appState.shopifyState.cart
  );
  const shopDetails = useSelector((appState) => appState.shopifyState.shop);
  const fetchProducts = useCallback(() => dispatch(getProducts()), [dispatch]);
  const fetchProduct = useCallback((handle) => dispatch(getProduct(handle)), [dispatch]);
  // const fetchCollection = () => dispatch(getCollection())
  const createCartAction = useCallback(() => dispatch(createCart()), [dispatch]);
  const createShop = useCallback(() => dispatch(shopInfo()), [dispatch]);
  const closeCart = useCallback(() => dispatch(handleCartClose()), [dispatch]);
  const openCart = useCallback(() => dispatch(handleCartOpen()), [dispatch]);
  const setCount = useCallback((count) => dispatch(handleSetCount(count)), [dispatch]);

  const addVariant = useCallback((cartId, lineItemsToAdd) =>
    dispatch(addVariantToCart(cartId, lineItemsToAdd)), [dispatch]);
  const updateQuantity = useCallback((lineItemId, quantity, cartId) =>
    dispatch(updateQuantityInCart(lineItemId, quantity, cartId)), [dispatch]);
  const removeLineItem = useCallback((cartId, lineItemId) =>
    dispatch(removeLineItemInCart(cartId, lineItemId)), [dispatch]);

  return {
    products,
    product,
    featured,
    cartStatus,
    cartState,
    cartCount,
    shopDetails,
    addVariant,
    fetchProducts,
    fetchProduct,
    // fetchCollection,
    createCart: createCartAction,
    createShop,
    closeCart,
    openCart,
    updateQuantity,
    removeLineItem,
    setCount,
  };
}
