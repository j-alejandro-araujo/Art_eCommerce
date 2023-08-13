import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import ClientError from './lib/client-error.js';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.get('/api/products/', async (req, res, next) => {
  try {
    const sql = `
      select *
      from "products"
    `;

    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.get('/api/products/:productId', async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!productId) {
      throw new ClientError(400, 'productId must be a positive integer.');
    }
    const sql = `
      select *
      from "products"
      where "productId" = $1
    `;

    const params = [productId];
    const result = await db.query(sql, params);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.post('/api/cart/addtocart', async (req, res, next) => {
  try {
    const { productId, qty, cartId } = req.body;
    const sql = `
      insert
      into "cartItems" ("productId", "qty", "cartId")
      values ($1, $2, $3)
      returning *
    `;

    const params = [productId, qty, cartId];
    const result = await db.query(sql, params);
    const [cart] = result.rows;
    res.status(201).json(cart);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.delete('/api/cart/removeitem', async (req, res, next) => {
  try {
    const { productId, cartId } = req.body;
    const sql = `
        delete
        from "cartItems"
        where "productId" = $1
        and "cartId" = $2
    `;
    const params = [productId, cartId];
    await db.query(sql, params);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.put('/api/cart/update', async (req, res, next) => {
  try {
    const { productId, cartId, qty } = req.body;
    const sql = `
      update "cartItems"
         set "qty" = $3
       where "productId" = $1
         and "cartId" = $2
    `;
    const params = [productId, cartId, qty];
    await db.query(sql, params);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.get('/api/cart/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const sql = `
      select *
        from "products"
        join "cartItems" using ("productId")
        join "cart" using ("cartId")
        join "user" using ("userId")
       where "user"."userId" = $1
    `;
    const params = [userId];
    const result = await db.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required.');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "user" ("username", "hashedPassword")
      values ($1, $2)
      returning *
    `;
    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    const cartSql = `
      insert into "cart" ("userId")
      values ($1)
      returning *
    `;
    const cartParams = [user.userId];
    await db.query(cartSql, cartParams);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select "userId",
             "hashedPassword",
             "cartId"
        from "user"
        join "cart" using ("userId")
       where "username" = $1
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }

    const { userId, hashedPassword, cartId } = user;

    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username, cartId };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Create React App server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
