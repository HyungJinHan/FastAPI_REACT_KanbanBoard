import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Board from './components/Board';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register setToken={setToken} />} />
        <Route path='/' element={<Board token={token} />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
