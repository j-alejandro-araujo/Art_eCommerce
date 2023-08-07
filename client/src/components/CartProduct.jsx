import React, { useState } from 'react';
import Quantity from './Quantity';

const CartProduct = ({ product, setCart }) => {
  const { name, qty, price, image, productId, cartId } = product;
  const [updatedQuantity, setUpdatedQuantity] = useState(qty);

  async function handleRemoveItem() {
    try {
      const req = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, cartId }),
      };
      const res = await fetch('/api/cart/removeitem', req);
      console.log('Response from server:', res); //check
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      setCart((prev) =>
        prev.filter((cartedItem) => cartedItem.productId !== productId)
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function updateItem(updatedQty) {
    try {
      console.log('quantity', qty);
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, qty: updatedQty }),
      };
      const res = await fetch('/api/cart/update', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      setCart((prev) =>
        prev.map((cartedItem) =>
          cartedItem.productId === productId
            ? { ...cartedItem, quantity: updatedQty }
            : cartedItem
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex items-center mb-4">
      <div className="w-24 h-24 aspect-w-1 bg-image hover-overlay hover-zoom ripple rounded">
        <img src={image} className="w-full h-full object-cover" alt={name} />
      </div>
      <div className="flex-grow ml-4">
        <p>
          <strong>{name}</strong>
        </p>
        <p>Price: ${price}</p>
        <button
          type="button"
          className="text-red-600"
          onClick={handleRemoveItem}>
          Remove
        </button>
      </div>
      <Quantity
        updatedQuantity={updatedQuantity}
        setUpdatedQuantity={setUpdatedQuantity}
        updateItem={updateItem}
      />
    </div>
  );
};

export default CartProduct;
