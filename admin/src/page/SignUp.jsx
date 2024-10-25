import React, {useState } from 'react';
import styles from '../css/SignUp.module.css';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState('');
   // eslint-disable-next-line
  const [permission, setPermission] = useState(true);
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the form data
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('password', password);
    formData.append('balance', balance);
    formData.append('permission', permission);

    // Log form data to the console
    console.log('Form Data:', {
      userName,
      password,
      balance,
      permission
    });

    // Call the signup function with the form data
    await signup(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cont}>
        <div className={styles.title}>
          <h2>SIGN UP</h2>
        </div>
        <div className={styles.form}>
          <input type="text" placeholder="Your userName" onChange={(e) => setUserName(e.target.value)} value={userName} />
          <input type="password" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <input type="number" placeholder="Your Balance" onChange={(e) => setBalance(e.target.value)} value={balance} />
        </div>
        <button className={styles.nextbutton} disabled={isLoading} onClick={handleSubmit}>
          Sign up
        </button>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.ask}>
          <span>Already have an account?</span> <Link to="/login"><p>Sign in here</p></Link>
        </div>
      </div>

     
    </div>
  );
};

export default SignUp;