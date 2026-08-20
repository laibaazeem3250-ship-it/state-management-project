# State Management Project — Context API & Redux Toolkit

One shopping-cart app, built two ways, kept in **separate sections** as the
instructor asked for the Context API and Redux parts.

## Live sections

- `/` — Home, links to both demos
- `/context-api` — Cart built with **Context API**
- `/redux-toolkit` — Cart + product list built with **Redux Toolkit**

## How each acceptance criterion is met

**✅ Built an app using Context API for shared state**
`src/context/CartContext.jsx` — a `CartContext` + `useReducer` holds the cart
items, and any component can read/update it via the `useCart()` hook
(`src/pages/ContextCartPage.jsx`). No prop drilling.

**✅ Created a Redux store with at least 2 slices**
`src/redux/store.js` combines two slices:
- `cartSlice` (`src/redux/cartSlice.js`) — add/remove/increment/decrement/clear
- `productsSlice` (`src/redux/productsSlice.js`) — product list + loading state

**✅ Used createAsyncThunk for an API call**
`src/redux/productsSlice.js` — `fetchProducts` is a `createAsyncThunk` that
fetches live product data from `https://fakestoreapi.com/products`, with
`pending` / `fulfilled` / `rejected` handled in `extraReducers`.

## Tech stack

React 19 + Vite, react-router-dom, @reduxjs/toolkit, react-redux.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
## Author
Laiba Azeem 