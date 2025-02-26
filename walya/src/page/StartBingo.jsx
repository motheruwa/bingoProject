import React, { useState, useEffect } from "react";
import styles from "../css/start.module.css";
import { useNavigate } from "react-router-dom";
import BingoCard from "../images/bingocard.jpg";
import startAudio from "../audio/START.mp4";
import pewwzew from "../audio/pewzew.mp4";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useLogout } from "../hooks/useLogout";
import BouncingBalls from "./BouncingBalls";

const StartBingo = () => {
  const { logout } = useLogout();
  const [registeredNumbers, setRegisteredNumbers] = useState([]);
  // eslint-disable-next-line
  const [fetchedUser, setFetchedUser] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [round, setRound] = useState(1);
  const [remainingMoney, setRemainingMoney] = useState(0);
  // eslint-disable-next-line
  const [deductedAmount, setDeductedAmount] = useState(null);
  const [previousBalance, setPreviousBalance] = useState(null);
  // eslint-disable-next-line
  const [totalAmount, setTotalAmount] = useState(0);
  const [userName, setUserName] = useState("");
  const [creatingReport, setCreatingReport] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };
  const fetchUserByUsername = async (userName) => {
    try {
      setCreatingReport(true);
      const response = await axios.get(
        `https://bin.zaahirahtravels.com/api/user/${userName}`
      );
      console.log("Fetched user by username:", response.data);
      setFetchedUser(response.data);
      setPreviousBalance(response.data.balance);
      localStorage.setItem("playType", response.data.playType);
      setCreatingReport(false);

      // Handle the fetched user data as needed
    } catch (error) {
      console.error("Error fetching user by username:", error);
      // Handle errors
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      fetchUserByUsername(user.userName);
    }
  }, [user]);

  useEffect(() => {
    const storedNumbers = localStorage.getItem("registeredNumbers");
    const storedAmount = localStorage.getItem("selectedAmount");
    const round = localStorage.getItem("roundsPlayed");

    if (storedNumbers) {
      setRegisteredNumbers(JSON.parse(storedNumbers));
    }
    if (round) {
      setRound(Number(round));
    }
    if (storedAmount) {
      setSelectedAmount(Number(storedAmount));
    }
    if(user)
    setUserName(user.userName);

    resetRoundCountIfNewDay();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Calculate the total amount
    const total = registeredNumbers.length * selectedAmount;
    setTotalAmount(total);

    // Calculate 15% of the total amount and set it as deductedAmount
    const deductionPercentage = 0.15; // 15%
    const calculatedDeductedAmount = total * deductionPercentage;
    setDeductedAmount(calculatedDeductedAmount);

    // Calculate the remaining money after deduction
    const remaining = total - calculatedDeductedAmount; //Use the calculated deducted amount here.
    setRemainingMoney(remaining);
    // eslint-disable-next-line
}, [registeredNumbers, selectedAmount]);

  const handleClick = async () => {
    try {
      if (previousBalance === null || deductedAmount === null) {
        return; // Return early if either previousBalance or deductedAmount is null
      }
      console.log(previousBalance);
      console.log(parseInt(deductedAmount))
      setCreatingReport(true);
      // Save the previous balance before deducting the amount
      const deductedAmountInt = parseInt(deductedAmount); // Ensure it's an integer
      const newBalance = previousBalance - deductedAmountInt;
  
      if (newBalance <= 0 || isNaN(newBalance) || newBalance === null) {
        return;
      }
      const response = await axios.put(
        `https://bin.zaahirahtravels.com/api/user/update`,
        { userName, newBalance }
      );
  
      if (response.status === 200) {
        console.log("Balance updated successfully");
      } else {
        return;
      }
  
      localStorage.setItem("remainingMoney", remainingMoney);
      localStorage.setItem("deductedAmount", deductedAmount);
      await createReport();
    } catch (error) {
      console.error("Report creation failed:", error);
   // Handle the error, e.g., show a message to the user
    }
  };

  const handleregisterClick = () => {
    navigate("/registerdcard");
  };
  const handleReportClick = () => {
    navigate("/report");
  };
  const handlepewzew = () => {
    const pewzew = new Audio(pewwzew);
    pewzew.play();
  };
  const resetRoundCountIfNewDay = () => {
    const lastResetDate = localStorage.getItem("lastResetDate");
    const currentDate = new Date().toLocaleDateString();

    if (lastResetDate !== currentDate) {
      localStorage.setItem("roundsPlayed", "1");
      localStorage.setItem("lastResetDate", currentDate);
    }
  };

  const createReport = async () => {
    try {
      const response = await axios.post("https://bin.zaahirahtravels.com/api/report", {
        round: round,
        selectedAmount: selectedAmount,
        deductedAmount: deductedAmount,
        userName: userName,
        winAmount: remainingMoney,
        noOfPlayer: registeredNumbers.length,
      });

      if (response.status === 200) {
        console.log("Report created successfully:", response.data);

        const audio = new Audio(startAudio);
        audio.onended = () => {
          const roundsPlayed =
            JSON.parse(localStorage.getItem("roundsPlayed")) || 0;
          localStorage.setItem("roundsPlayed", roundsPlayed + 1);

          navigate("/randombingonumber");
        };
        audio.play();

        // Handle the response as needed
      } else {
        throw new Error("Failed to create report. Status: " + response.status);
      }
    } catch (error) {
      console.error("Error creating report:", error);
      // Handle errors
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.bounce}><BouncingBalls/></div>
      <div className={styles.link}>
        <div onClickCapture={handleregisterClick}>RegisterCard</div>
        <div onClickCapture={handleReportClick}>Report</div>
        <div onClick={handleLogOut}>Logout</div>
      </div>
      <div className={styles.card}>
        <img src={BingoCard} alt="Bingo Card" />
      </div>
      <div className={styles.button}>
        <button
          onClick={handleClick}
          disabled={registeredNumbers.length <= 1 || creatingReport}
          className={styles.lowbutton}
        >
          Start
        </button>
        <div onClick={handlepewzew} className={styles.pewzew}>
          ፐውዘው
        </div>
      </div>
    </div>
  );
};

export default StartBingo;
