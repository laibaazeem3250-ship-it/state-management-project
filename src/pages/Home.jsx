import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="card home-hero">
      <span className="badge">Same cart, two architectures</span>
      <h2 className="page-title">Global state management demo</h2>
      <p>
        One shopping cart, built two ways — first with the Context API, then
        with Redux Toolkit — kept in separate sections so each approach can
        be reviewed on its own.
      </p>
      <div className="home-links">
        <Link className="context" to="/context-api">
          Context API section →
        </Link>
        <Link className="redux" to="/redux-toolkit">
          Redux Toolkit section →
        </Link>
      </div>
    </div>
  );
}
