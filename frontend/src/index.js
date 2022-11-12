import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Board from './components/Board';
import { BrowserRouter, redirect, Route, Routes } from 'react-router-dom'
import Register from './components/Register';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          !token ?
            redirect('/register') :
            <Board token={token} />
        }
        />
        <Route path='/register' element={<Register setToken={setToken} />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
