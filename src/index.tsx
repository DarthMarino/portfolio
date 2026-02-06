/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

// Wait for fonts and stylesheets to load before rendering
// This prevents "layout forced before page fully loaded" warnings
Promise.all([
  document.fonts.ready,
  new Promise(resolve => {
    if (document.readyState === 'complete') {
      resolve(true);
    } else {
      window.addEventListener('load', () => resolve(true));
    }
  })
]).then(() => {
  render(() => <App />, root!);
});
