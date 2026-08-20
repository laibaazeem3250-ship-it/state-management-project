import { createContext, useContext, useReducer } from 'react';

// ---- 1. Shared shape ----
const CartContext = createContext(null);

const initialState = {
  items: [], // { id, title, price, image, qty }
};

// ---- 2. Reducer: all cart logic lives here ----
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, qty: i.qty + 1 } : i
        ),
      };
    case 'DECREMENT':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload ? { ...i, qty: i.qty - 1 } : i
          )
          .filter((i) => i.qty > 0),
      };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

// ---- 3. Provider: this is what makes it "Context API for shared state" ----
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const increment = (id) => dispatch({ type: 'INCREMENT', payload: id });
  const decrement = (id) => dispatch({ type: 'DECREMENT', payload: id });
  const clear = () => dispatch({ type: 'CLEAR' });

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  const value = {
    items: state.items,
    addItem,
    removeItem,
    increment,
    decrement,
    clear,
    total,
    count,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ---- 4. Custom hook so consumers never touch useContext directly ----
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside a CartProvider');
  return ctx;
}
