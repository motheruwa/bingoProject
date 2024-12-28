import React, { useState, useEffect } from 'react';
import styles from '../css/Login.module.css';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Client-side validation for username
    if (userName !== 'miki' && userName !=='mule bingo') {
      setErrorMessage('Username not found');
      return;
    }
    await login(userName, password);
  };

  useEffect(() => {
    // Check for calledNumbers and registeredNumbers in localStorage and remove them if found
    const calledNumbers = localStorage.getItem('calledNumbers');
    const registeredNumbers = localStorage.getItem('registeredNumbers');
    const sequenceIndex = localStorage.getItem('sequenceIndex');

    if (calledNumbers) {
      localStorage.removeItem('calledNumbers');
    }

    if (registeredNumbers) {
      localStorage.removeItem('registeredNumbers');
    }

    if (sequenceIndex) {
      localStorage.removeItem('sequenceIndex');
    }

  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <p className={styles.x}>X</p>
        <p className={styles.bingo}>Bingo</p>
      </div>
      <div className={styles.cont}>
        <div className={styles.title}><h2>SIGN IN</h2></div>
        <div className={styles.form}>
          <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName} placeholder="Your username" />
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Your Password" />
        </div>
        <div className={styles.button} onClick={handleSubmit} disabled={isLoading}>
          Sign In
        </div>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        {error && <div className={styles.error}>{error}</div>}
        
      </div>
    </div>
  );
};

export default Login;