import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import startAudio from "../audio/START.mp4";
import axios from "axios";
import styles from "../css/Card.module.css";

const Replay = () => {
  const [deductedAmount, setDeductedAmount] = useState(0);
  const [previousBalance, setPreviousBalance] = useState(null);
  const [registeredNumbers, setRegisteredNumbers] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [round, setRound] = useState(1);
  // eslint-disable-next-line
const [fetchedUser, setFetchedUser] = useState([]);
  const [remainingMoney, setRemainingMoney] = useState(0);
  const [creatingReport, setCreatingReport] = useState(false);
  const [userName, setUserName] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const fetchUserByUsername = async (userName) => {
    try {
      const response = await axios.get(
        `https://bin.zaahirahtravels.com/api/user/${userName}`
      );
      setFetchedUser(response.data);
      setPreviousBalance(response.data.balance);
      localStorage.setItem("playType", response.data.playType);
    } catch (error) {
      console.error("Error fetching user by username:", error);
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
    const remainingMoney = localStorage.getItem("remainingMoney");
    const round = localStorage.getItem("roundsPlayed");
    const deductedAmount = localStorage.getItem("deductedAmount");

    if (storedNumbers) {
      setRegisteredNumbers(JSON.parse(storedNumbers));
    }
    if (round) {
      setRound(Number(round));
    }
    if (storedAmount) {
      setSelectedAmount(Number(storedAmount));
    }
    if (remainingMoney) {
      setRemainingMoney(Number(remainingMoney));
    }
    if (deductedAmount) {
        setDeductedAmount(Number(deductedAmount));
      }
    setUserName(user.userName);
    // eslint-disable-next-line
  }, []);

  const handleClick = async () => {
  
    try {
      if (previousBalance === null || deductedAmount === null) {
        return;
      }
  
      setCreatingReport(true);
      const deductedAmountInt = parseInt(deductedAmount);
      const newBalance = previousBalance - deductedAmountInt;
  
      const response = await axios.put(
        `https://bin.zaahirahtravels.com/api/user/update`,
        { userName, newBalance }
      );
  
      if (response.status === 200) {
        console.log("Balance updated successfully");
        localStorage.setItem("remainingMoney", remainingMoney);
        await createReport(); // Call createReport after updating balance
      } else {
        return;
      }
    } catch (error) {
      console.error("Report creation failed:", error);
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
        const audio = new Audio(startAudio);
        audio.onended = () => {
          const roundsPlayed = JSON.parse(localStorage.getItem("roundsPlayed")) || 0;
          localStorage.setItem("roundsPlayed", roundsPlayed + 1);
    localStorage.setItem("calledNumbers", null);
           navigate("/randombingonumber");
        };
        audio.play();
      } else {
        throw new Error("Failed to create report. Status: " + response.status);
      }
    } catch (error) {
      console.error("Error creating report:", error);
    }
  };
  
  return (
    <button className={styles.replay} onClick={handleClick} disabled={creatingReport}>
      Replay
    </button>
  );
};

export default Replay;