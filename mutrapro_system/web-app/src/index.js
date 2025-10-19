import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // File style chung cho index
import App from './App'; // Import component App chính

// Dòng này tìm đến thẻ <div id="root"> trong file public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Dòng này "gắn" toàn bộ ứng dụng React (bắt đầu từ component App) vào thẻ div đó.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);