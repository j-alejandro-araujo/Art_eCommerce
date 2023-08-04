// Fetches all products from database.
export async function fetchAllProducts() {
  const response = await fetch('/api/products/');
  if (!response.ok)
    throw new Error(`Error fetching products: ${response.status}`);
  return await response.json();
}

// Fetches product details by productId.
export async function fetchProduct(productId) {
  const response = await fetch(`/api/products/${productId}`);
  if (!response.ok)
    throw new Error(`Error fetching selected product ${response.status}`);
  return await response.json();
}
