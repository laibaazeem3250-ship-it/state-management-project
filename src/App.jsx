import { Routes, Route, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Home from './pages/Home';
import ContextCartPage from './pages/ContextCartPage';
import ReduxCartPage from './pages/ReduxCartPage';

function Nav() {
  return (
    <nav className="navbar">
      <h1>
        <span className="mark" />
        State Management Project
      </h1>
      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/context-api">Context API</NavLink>
        <NavLink to="/redux-toolkit">Redux Toolkit</NavLink>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <div className="app-shell">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/context-api" element={<ContextCartPage />} />
          <Route path="/redux-toolkit" element={<ReduxCartPage />} />
        </Routes>
      </div>
    </Provider>
  );
}
