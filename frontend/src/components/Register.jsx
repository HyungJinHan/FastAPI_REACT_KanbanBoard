import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    createUser().then(data => {
      props.setToken(data.access_token);
      localStorage.setItem('token', JSON.stringify(data.access_token));
      navigate('/');
    })
  }

  async function createUser() {
    const formData = {
      username: username,
      password: password
    };

    const response = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();

    return data;
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <p>
        Username
        <input
          type='text'
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </p>
      <p>
        Passsword
        <input
          type='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </p>
      <p>
        <input type='button' value='Register' />
      </p>
    </form>
  );
}

export default Register;