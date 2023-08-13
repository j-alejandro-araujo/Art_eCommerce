export async function fetchAllProducts() {
  const res = await fetch('/api/products/');
  if (!res.ok) throw new Error(`Error fetching products: ${res.status}`);
  return await res.json();
}

export async function fetchProduct(productId) {
  const res = await fetch(`/api/products/${productId}`);
  if (!res.ok) throw new Error(`Error fetching selected product ${res.status}`);
  return await res.json();
}

export async function addToCart(productId, qty, cartId) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, qty, cartId }),
  };
  const res = await fetch('/api/cart/addtocart', req);
  return await res.json();
}

export async function updateCart(cartId, productId, updatedQty) {
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartId, productId, qty: updatedQty }),
  };
  const res = await fetch('/api/cart/update', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
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

  try {
    const res = await fetch(`/api/auth/${action}`, req);
    if (!res.ok) {
      throw new Error(`fetch Error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    throw new Error(`Network Error: ${err.message}`);
  }
}
