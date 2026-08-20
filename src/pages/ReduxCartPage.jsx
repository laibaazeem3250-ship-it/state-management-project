import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import { addItem, removeItem, increment, decrement, clear } from '../redux/cartSlice';
import FlowDiagram from '../components/FlowDiagram';

const flowSteps = [
  { label: 'fakestoreapi.com', sub: 'live API' },
  { label: 'createAsyncThunk', sub: 'productsSlice' },
  { label: 'store', sub: 'cart + products' },
  { label: 'useSelector', sub: 'components' },
];

function ProductList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  if (status === 'loading') return <p className="status">Loading products…</p>;
  if (status === 'failed') return <p className="status error">Error: {error}</p>;

  return (
    <div className="product-grid">
      {items.map((p) => (
        <div className="card product-card" key={p.id}>
          <img src={p.image} alt={p.title} />
          <h3>{p.title}</h3>
          <div className="price">${p.price.toFixed(2)}</div>
          <button className="btn-primary" onClick={() => dispatch(addItem(p))}>
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

function CartPanel() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="card cart-panel">
      <h2>Cart (Redux Toolkit)</h2>
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
              <button onClick={() => dispatch(decrement(item.id))}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => dispatch(increment(item.id))}>+</button>
            </div>
            <button className="btn-ghost" onClick={() => dispatch(removeItem(item.id))}>
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
          <button className="btn-primary" style={{ marginTop: 10 }} onClick={() => dispatch(clear())}>
            Clear cart
          </button>
        </>
      )}
    </div>
  );
}

export default function ReduxCartPage() {
  return (
    <>
      <span className="badge redux">Redux Toolkit</span>
      <h2 className="page-title">Cart + Products via Redux Toolkit</h2>
      <p className="page-sub">
        Two slices: <code>productsSlice</code> (fetched with{' '}
        <code>createAsyncThunk</code> from a live API) and <code>cartSlice</code>{' '}
        (local cart logic). Both live in one global <code>store</code>.
      </p>
      <div className="flow-diagram">
        <FlowDiagram steps={flowSteps} accent="#0BA586" />
      </div>
      <div className="layout">
        <ProductList />
        <CartPanel />
      </div>
    </>
  );
}
