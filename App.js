import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <div className="App">
      {token ? (
        <Home token={token} setToken={setToken} />
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
}

export default App;
