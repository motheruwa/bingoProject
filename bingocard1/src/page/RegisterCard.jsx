import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/RegisterCard.module.css";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useLogout } from "../hooks/useLogout";
import { FaPhoneAlt } from "react-icons/fa";
import logo from "../images/logo.jpg";

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
  const [showModal, setShowModal] = useState(false); // Modal state

  const handleLogOut = () => {
    logout();
    setShowModal(true); // Show custom fullscreen modal
  };

  const fetchUserByUsername = async (userName) => {
    try {
      const response = await axios.get(
        `https://binx.wabisecurityandcleaningservice.com/api/user/${userName}`
      );

      if (response.status === 200) {
        setFetchedUser(response.data);
        if (response.data.permission === "false") {
          handleLogOut();
        }
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
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
      setRoundsPlayed(parseInt(storedRounds, 10));
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
      <div className={styles.contact}>
        <div className={styles.logo}>
          <img src={logo} alt="MRX" />
        </div>
        <div className={styles.phone1}>የቢንጎ ሶፍትዌር ይፈልጋሉ ?</div>
        <div className={styles.phone1}>
          <div>
            <FaPhoneAlt /> 0900-380476
          </div>
        </div>
        <div className={styles.phone2}>
          <div>
            <FaPhoneAlt /> 0912-012543
          </div>
        </div>
      </div>

      <div className={styles.contwhole}>
        <div className={styles.cont}>
          <div className={styles.odd}>ካርድ ቁጥሮች</div>
          <div className={styles.numberscontainer}>
            {[...Array(100).keys()].map((number) => (
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
                {user?.userName?.toLowerCase() !== "emuye2" && (
      <option value={10}>በ 10</option>
    )}
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

      {/* Fullscreen Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            እርስዎ መግባት ተከልክለዋል
          </h1>
          <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
            You have been restricted
          </h1>
          <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
            ለተጨማሪ መረጃና ሲስተሙን ለማስተካክል በዚህ ስልክ ቁጥር ይደውሉ
          </h1>
          <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
            0948256222 // 0912012543
          </h1>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              backgroundColor: "#ff4444",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterCard;
