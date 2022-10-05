import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import client from '../client';
import { useLoggedInUser } from '../context/LoggedInUser';

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { setToken } = useLoggedInUser();

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const data = await client.post('/register', {
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
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
      <form
        className="flex flex-col max-w-sm mx-auto mt-3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="registerFormUsername">Username</label>
          <input
            className="border border-black"
            type="text"
            name="username"
            id="registerFormUsername"
            value={registerForm.username}
            onChange={handleChange}
          />
          <label htmlFor="registerFormEmail">Email</label>
          <input
            className="border border-black"
            type="text"
            name="email"
            id="registerFormEmail"
            value={registerForm.email}
            onChange={handleChange}
          />
          <label htmlFor="registerFormPassword">Password</label>
          <input
            className="border border-black"
            type="password"
            name="password"
            id="registerFormPassword"
            value={registerForm.password}
            onChange={handleChange}
          />
        </div>

        <button className="mt-6 border border-black rounded-md w-32 mx-auto">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
