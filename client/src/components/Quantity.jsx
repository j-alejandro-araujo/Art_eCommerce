import React from 'react';

const Quantity = ({ updatedQuantity, setUpdatedQuantity, updateItem }) => {
  return (
    <div className="border border-secondary d-inline-block p-3 position-relative rounded mt-3">
      <div className="input-group position-absolute top-0 start-0 translate-middle-y ms-3 d-flex">
        Quantity
      </div>
      <div className="input-group">
        <i
          className="fas fa-minus"
          onClick={() => {
            console.log('updatedQuantity', updatedQuantity);
            updatedQuantity > 1 &&
              setUpdatedQuantity(Number(updatedQuantity) - 1);
            updateItem(Number(updatedQuantity) - 1);
          }}
        />
        <span className="input-group-text border border-secondary px-3 fw-bold">
          {updatedQuantity}
        </span>
        <i
          className="fas fa-plus"
          onClick={() => {
            setUpdatedQuantity(Number(updatedQuantity) + 1);
            updateItem(Number(updatedQuantity) + 1);
          }}
        />
      </div>
    </div>
  );
};

export default Quantity;
