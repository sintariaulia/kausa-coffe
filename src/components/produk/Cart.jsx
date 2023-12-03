// Cart.js
import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <div className="absolute right-0 mt-12 mr-4 bg-white p-4 border shadow-lg rounded">
      <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-2">
              {item.name}
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
