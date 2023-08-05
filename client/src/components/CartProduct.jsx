import React, { useState } from 'react';
import Quantity from './Quantity';

const CartProduct = ({ product, setCart }) => {
  const { name, qty, price, image, productId } = product;
  const [updatedQuantity, setUpdatedQuantity] = useState(qty);

  async function handleRemoveItem() {
    try {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      };
      const res = await fetch('/api/cart/removeitem', req);
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
            ? { ...cartedItem, quantity: qty }
            : cartedItem
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="row">
      <div className="col-lg-3 col-md-12 md-4 md-lg-0 d-flex align-items-center justify-content-center">
        <div
          className="bg-image hover-overlay hover-zoom ripple rounded"
          data-mdb-ripple-color="light">
          <img src={image} className="img-fluid" alt={name} />
        </div>
      </div>
      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
        <p>
          <strong>{name}</strong>
        </p>
        <p>Price: ${price}</p>
        <button
          type="button"
          className="btn btn-danger btn-sm me-1 mb-2"
          onClick={handleRemoveItem}>
          <i className="fas fa-trash" />
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
