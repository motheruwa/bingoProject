import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/RegisterCard.module.css";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useLogout } from "../hooks/useLogout";
import { FaPhoneAlt } from "react-icons/fa";

const RegisterCard = () => {
  const { logout } = useLogout();
  const [registeredNumbers, setRegisteredNumbers] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(20);
  // eslint-disable-next-line
  const [roundsPlayed, setRoundsPlayed] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  // eslint-disable-next-line
  const [fetchedUser, setFetchedUser] = useState([]);
  // eslint-disable-next-line
  const [userName, setUserName] = useState("");

  const handleLogOut = () => {
    logout();
    navigate("/login");
    alert("you have been restricted");
  };
  const fetchUserByUsername = async (userName) => {
    try {
      const response = await axios.get(
        `https://binx.wabisecurityandcleaningservice.com/api/user/${userName}`
      );

      // Check if the response status is successful
      if (response.status === 200) {
        setFetchedUser(response.data);
        console.log(response.data);
        if (response.data.permission === "false") {
          handleLogOut();
        }
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error(
          "Server responded with non-2xx status:",
          error.response.data
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request failed:", error.message);
      }

      throw error; // Re-throw the error for handling in the calling code
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      fetchUserByUsername(user.userName);
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    const storedNumbers = localStorage.getItem("registeredNumbers");
    const storedAmount = localStorage.getItem("selectedAmount");
    const storedRounds = localStorage.getItem("roundsPlayed");

    if (storedNumbers) {
      setRegisteredNumbers(JSON.parse(storedNumbers));
    }

    if (!storedAmount) {
      setSelectedAmount(20);
      localStorage.setItem("selectedAmount", "20");
    } else {
      setSelectedAmount(parseInt(storedAmount, 10));
    }

    if (storedRounds) {
      setRoundsPlayed(parseInt(storedRounds, 10)); // Set the rounds played state
    }
  }, []);

  const handleNumberClick = (number) => {
    let updatedNumbers;
    if (registeredNumbers.includes(number)) {
      updatedNumbers = registeredNumbers.filter((num) => num !== number);
    } else {
      updatedNumbers = [...registeredNumbers, number];
    }
    setRegisteredNumbers(updatedNumbers);
    localStorage.setItem("registeredNumbers", JSON.stringify(updatedNumbers));
  };

  const handleAmountChange = (event) => {
    const amount = parseInt(event.target.value);
    setSelectedAmount(amount);
    localStorage.setItem("selectedAmount", amount.toString());
  };

  const handlePlay = () => {
    navigate("/startbingo");
  };

  return (
     <div className={styles.container}>
              <div className={styles.cont}>
              <div className={styles.phone}> <div><FaPhoneAlt />  0900-380476 // 0912-012543</div></div>
                <div className={styles.odd}>ካርድ ቁጥሮች</div>
        
                <div className={styles.numberscontainer}>
                  {[...Array(70).keys()].map((number) => (
                    <div
                      key={number + 1}
                      className={
                        registeredNumbers.includes(number + 1)
                          ? styles.registered
                          : styles.unregistered
                      }
                      onClick={() => handleNumberClick(number + 1)}
                    >
                      {number + 1}
                    </div>
                  ))}
                </div>
              </div>
        
              {registeredNumbers.length > 0 && (
                <div className={styles.playoption}>
                  <div className={styles.memezgeb}>እባክዎ ቁጥሮት መመዝገቡን ያረጋግጡ</div>
                  <div className={styles.renumber}>
                    <ul>
                      {registeredNumbers.map((number) => (
                        <li key={number}>{number}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.select}>
                    <select
                      id="amount"
                      value={selectedAmount}
                      onChange={handleAmountChange}
                    >
                     <option value={10}>በ 10</option>
                                   <option value={20}>በ 20</option>
                                   <option value={30}>በ 30</option>
                                   <option value={40}>በ 40</option>
                                   <option value={50}>በ 50</option>
                                   <option value={100}>በ 100</option>
                                   <option value={200}>በ 200</option>
                                   <option value={300}>በ 300</option>
                                   <option value={400}>በ 400</option>
                                   <option value={500}>በ 500</option>
                    </select>
                  </div>
        
                  <button className={styles.button} onClick={handlePlay}>
                    Play
                  </button>
                </div>
              )}
            </div>
  );
};

export default RegisterCard;
