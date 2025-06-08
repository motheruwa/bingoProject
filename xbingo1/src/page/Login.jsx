import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Login.module.css';

const userData = [
  { username: 'stifv', password: 'iamstifv' },
  { username: 'saint', password: 'pass123' },
];

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = userData.find(
      (u) => u.username === formData.username && u.password === formData.password
    );

    if (user) {
      setError('');
      navigate('/adminmrxbingobingo');  // Navigate to AdminPage
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;
