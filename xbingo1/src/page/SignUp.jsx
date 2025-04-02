import React, { useState } from 'react';
import styles from '../css/SignUp.module.css';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [playType, setPlayType] = useState('default');
  const [balance, setBalance] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  const handlePlayTypeChange = (value) => {
    setPlayType(value);
};

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    const userData = {
      userName: userName,
      password: password,
      balance: balance,
      permission: 'true',
      playType: playType,
    };

    try {
      const response = await axios.post('https://binx2.wabisecurityandcleaningservice.com/api/user/signup', userData);

      if (response.status === 200) {
        // update the auth context
      localStorage.setItem('Ruser', JSON.stringify(response.data))
        dispatch({ type: 'LOGIN', payload: response.data });
        setSuccess('Account created successfully!')
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  const handleBackClick = () => {
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <div className={styles.back} onClick={handleBackClick}>
<IoMdArrowRoundBack size={'2 rem'}/>
      </div>
      <div className={styles.cont}>
        <div className={styles.title}>
          <h2>Add User</h2>
        </div>
        <div className={styles.form}>
          <input type="text" placeholder="Your userName" onChange={(e) => setUserName(e.target.value)} value={userName} />
          <input type="password" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <input type="text" placeholder="balance" onChange={(e) => setBalance(e.target.value)} value={balance} />
          <div className={styles.selectdiv}>
                          <select value={playType} onChange={(e) => handlePlayTypeChange(e.target.value)} className={styles.selectoption}>
                              <option value="default">Default</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                              <option value="13">13</option>
                              <option value="14">14</option>
                              <option value="15">15</option>
                              <option value="16">16</option>
                              <option value="17">17</option>
                              <option value="18">18</option>
                              <option value="19">19</option>
                              <option value="20">20</option>
                              <option value="21">21</option>
                              <option value="22">22</option>
                              <option value="23">23</option>
                              <option value="24">24</option>
                              <option value="25">25</option>
                              <option value="26">26</option>
                              <option value="27">27</option>
                              <option value="28">28</option>
                              <option value="29">29</option>
                              <option value="30">30</option>
                          </select>
                </div>
        </div>
        <button className={styles.nextbutton} disabled={isLoading} onClick={handleSubmit}>
          Add User
        </button>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
      </div>
    </div>
  );
};

export default SignUp;