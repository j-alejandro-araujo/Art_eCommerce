import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Quantity = ({ initialQuantity, updateItem }) => {
  const [updatedQuantity, setUpdatedQuantity] = useState(initialQuantity || 1);

  const handleMinusClick = () => {
    if (updatedQuantity > 1) {
      const newQuantity = updatedQuantity - 1;
      setUpdatedQuantity(newQuantity);
      updateItem(newQuantity);
    }
  };

  const handlePlusClick = () => {
    const newQuantity = updatedQuantity + 1;
    setUpdatedQuantity(newQuantity);
    updateItem(newQuantity);
  };

  return (
    <div className="border border-secondary inline-block p-3 relative rounded mt-3">
      <div className="absolute top-0 left-0 transform -translate-y-3/4 bg-white px-2 font-semibold">
        Quantity
      </div>
      <div className="input-group flex items-center">
        <button
          className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-l-md"
          onClick={handleMinusClick}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span className="input-group-text border-t border-b border-transparent px-3 font-bold">
          {updatedQuantity}
        </span>
        <button
          className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-r-md"
          onClick={handlePlusClick}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default Quantity;
