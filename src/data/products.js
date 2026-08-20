// Static catalog for the Context API demo (no fetching needed here on purpose —
// the async/API part of the task is demonstrated in the Redux Toolkit section).
// Photos come from Picsum with fixed seeds, so each product keeps the same image.
export const staticProducts = [
  { id: 1, title: 'Wireless Mouse', price: 19.99, image: 'https://picsum.photos/seed/mouse-01/300/220' },
  { id: 2, title: 'Mechanical Keyboard', price: 49.99, image: 'https://picsum.photos/seed/keyboard-01/300/220' },
  { id: 3, title: 'USB-C Hub', price: 24.5, image: 'https://picsum.photos/seed/usbhub-01/300/220' },
  { id: 4, title: 'Laptop Stand', price: 32.0, image: 'https://picsum.photos/seed/stand-01/300/220' },
  { id: 5, title: 'Webcam 1080p', price: 39.99, image: 'https://picsum.photos/seed/webcam-01/300/220' },
  { id: 6, title: 'Desk Lamp', price: 27.75, image: 'https://picsum.photos/seed/lamp-01/300/220' },
];
