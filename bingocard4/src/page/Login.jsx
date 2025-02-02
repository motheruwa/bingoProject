import React, { useState, useEffect } from "react";
import styles from "../css/Login.module.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (userName !== 'esti' &&userName !== 'dani' &&userName !== 'saint' &&userName !== 'messi' && userName !== 'yirgu bingo' && userName !== 'blen xbingo' && userName !== 'Phoenix7' && userName !== 'Pegasus7') {
      setError('User not found');
      return;
    }
    setIsLoading(true);
    setError("");

    const userData = {
      userName: userName,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://bin.zaahirahtravels.com/api/user/login",
        userData
      );

      if (response.status === 200) {
        // update the auth context
        localStorage.setItem("Ruser", JSON.stringify(response.data));
        dispatch({ type: "LOGIN", payload: response.data });
        console.log("login successfully!");
        navigate("/startbingo");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message || "An error occurred");
    }
  };

  useEffect(() => {
    // Check for calledNumbers and registeredNumbers in localStorage and remove them if found
    const calledNumbers = localStorage.getItem("calledNumbers");
    const registeredNumbers = localStorage.getItem("registeredNumbers");
    const sequenceIndex = localStorage.getItem("sequenceIndex");

    if (calledNumbers) {
      localStorage.removeItem("calledNumbers");
    }

    if (registeredNumbers) {
      localStorage.removeItem("registeredNumbers");
    }

    if (sequenceIndex) {
      localStorage.removeItem("sequenceIndex");
    }
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <p className={styles.x}>X</p>
        <p className={styles.bingo}>Bingo</p>
      </div>
      <div className={styles.cont}>
        <div className={styles.title}>
          <h2>SIGN IN</h2>
        </div>
        <div className={styles.form}>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            placeholder="Your username"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Your Password"
          />
        </div>
        <div
  className={styles.button}
  onClick={handleSubmit}
  disabled={isLoading}
>
  {isLoading ? (
    <div className={styles.spinner}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  ) : (
    'Sign In'
  )}
</div>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

export default Login;
