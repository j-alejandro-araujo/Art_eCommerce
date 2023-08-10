import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { fetchAllProducts } from '../lib/api';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchResultsVisible, setSearchResultsVisible] = useState(false);

  const inputRef = useRef();
  const resultsRef = useRef();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredResults = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(filteredResults);

    setSearchResultsVisible(term.length > 0 && filteredResults.length > 0);
  };

  const handleResultClick = (productId) => {
    navigate(`/details/${productId}`);
    setSearchResultsVisible(false);
  };

  const handleOutsideClick = (e) => {
    if (
      !inputRef.current?.contains(e.target) &&
      !resultsRef.current?.contains(e.target)
    ) {
      setSearchResultsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="relative bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[300px] m:w-[400px] lg:w-[600px]">
      <FontAwesomeIcon icon={faSearch} />
      <input
        ref={inputRef}
        className="bg-transparent p-2 w-full focus:outline-none"
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {isSearchResultsVisible && (
        <div
          ref={resultsRef}
          className="search-results absolute left-5 right-5 top-8 mt-2 p-2 bg-white border border-gray-300 shadow z-10">
          {searchResults.map((result) => (
            <div
              key={result.productId}
              className="search-result cursor-pointer hover:bg-gray-100 p-1"
              onClick={() => handleResultClick(result.productId)}>
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
