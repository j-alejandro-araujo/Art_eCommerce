export async function fetchAllProducts() {
  const response = await fetch('/api/products/');
  if (!response.ok)
    throw new Error(`Error fetching products: ${response.status}`);
  return await response.json();
}

export async function fetchProduct(productId) {
  const response = await fetch(`/api/products/${productId}`);
  if (!response.ok)
    throw new Error(`Error fetching selected product ${response.status}`);
  return await response.json();
}

export async function addToCart(productId, qty, cartId) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, qty, cartId }),
  };
  const response = await fetch('/api/cart/addtocart', req);
  return await response.json();
}

export async function fetchCart(userId) {
  const res = await fetch(`/api/cart/${userId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function signIn(username, password) {
  return authenticate('sign-in', username, password);
}

export async function signUp(username, password) {
  return authenticate('sign-up', username, password);
}

export async function authenticate(action, username, password) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  };
  const res = await fetch(`/api/auth/${action}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return res.json();
}
