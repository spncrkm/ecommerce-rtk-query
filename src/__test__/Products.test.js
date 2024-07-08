import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Products from '../components/Products';

test('adds product to cart when "Add to Cart" button is clicked', () => {
  const mockProduct = { id: 1, title: 'Product Title', price: 10 };
  let cartItems = [];

  const addToCart = (product) => {
    cartItems.push(product);
  };

  const { getByText } = render(
    <Products {...mockProduct} onAddToCart={addToCart} />
  );

  // Check if product details are rendered correctly
  expect(getByText('Product Title')).toBeInTheDocument();
  expect(getByText('Price: $10')).toBeInTheDocument();

  // Simulate clicking "Add to Cart"
  fireEvent.click(getByText('Add to Cart'));

  // Check if product is added to cart
  expect(cartItems).toHaveLength(1);
  expect(cartItems[0]).toEqual(mockProduct);
});