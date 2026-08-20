import { useEffect, useState } from 'react';
import { CartProvider, useCart } from '../context/CartContext';
import FlowDiagram from '../components/FlowDiagram';

const flowSteps = [
  { label: 'Product card', sub: 'onClick' },
  { label: 'useCart()', sub: 'consumer hook' },
  { label: 'CartContext', sub: 'useReducer' },
  { label: 'Cart panel', sub: 're-renders' },
];

function ProductList() {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    Promise.all([
      fetch('https://fakestoreapi.com/products/category/electronics').then((res) => {
        if (!res.ok) throw new Error('Failed to load products');
        return res.json();
      }),
      fetch('https://fakestoreapi.com/products/category/jewelery').then((res) => {
        if (!res.ok) throw new Error('Failed to load products');
        return res.json();
      }),
    ])
      .then(([electronics, jewelery]) => {
        setProducts([...electronics, ...jewelery]);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'loading') return <p className="status">Loading products…</p>;
  if (status === 'error') return <p className="status error">Couldn't load products.</p>;

  return (
    <div className="product-grid">
      {products.map((p) => (
        <div className="card product-card" key={p.id}>
          <img src={p.image} alt={p.title} />
          <h3>{p.title}</h3>
          <div className="price">${p.price.toFixed(2)}</div>
          <button className="btn-primary" onClick={() => addItem(p)}>
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

function CartPanel() {
  const { items, removeItem, increment, decrement, total, clear } = useCart();
  return (
    <div className="card cart-panel">
      <h2>Cart (Context API)</h2>
      {items.length === 0 && <p className="empty">No items yet — add something!</p>}
      {items.map((item) => (
        <div className="cart-item" key={item.id}>
          <span className="name">{item.title}</span>
          <div className="cart-item-row">
            <span className="leader" />
            <span className="line-price">${(item.price * item.qty).toFixed(2)}</span>
          </div>
          <div className="cart-item-meta">
            <div className="qty-controls">
              <button onClick={() => decrement(item.id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => increment(item.id)}>+</button>
            </div>
            <button className="btn-ghost" onClick={() => removeItem(item.id)}>
              remove
            </button>
          </div>
        </div>
      ))}
      {items.length > 0 && (
        <>
          <div className="cart-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="btn-primary" style={{ marginTop: 10 }} onClick={clear}>
            Clear cart
          </button>
        </>
      )}
    </div>
  );
}

export default function ContextCartPage() {
  return (
    <CartProvider>
      <span className="badge context">Context API + useReducer</span>
      <h2 className="page-title">Shared Cart State via Context API</h2>
      <p className="page-sub">
        Cart state lives in <code>CartContext</code>, updated through a reducer, and
        consumed by any component with <code>useCart()</code> — no prop drilling.
      </p>
      <div className="flow-diagram">
        <FlowDiagram steps={flowSteps} accent="#6D5EF5" />
      </div>
      <div className="layout">
        <ProductList />
        <CartPanel />
      </div>
    </CartProvider>
  );
}
