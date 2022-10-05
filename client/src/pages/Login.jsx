import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import client from '../client';
import { useLoggedInUser } from '../context/LoggedInUser';

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const { setToken } = useLoggedInUser();

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const data = await client.post('/login', {
        usernameOrEmail: loginForm.usernameOrEmail,
        password: loginForm.password,
      });

      const token = data.data.token;

      localStorage.setItem('chat-app-token', token);
      setToken(token);
      navigate('/');
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="usernameOrEmail"
          value={loginForm.usernameOrEmail}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={loginForm.password}
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
