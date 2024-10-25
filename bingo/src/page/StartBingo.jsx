import React, { useState, useEffect } from 'react';
import styles from '../css/start.module.css';
import { useNavigate } from 'react-router-dom';
import BingoCard from '../images/bingocard.jpg';
import startAudio from '../audio/START.mp4';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios'
import { supabase } from '../store/Supabase'
import { useLogout } from '../hooks/useLogout';


const StartBingo = () => {
  const { logout } = useLogout();
  const [registeredNumbers, setRegisteredNumbers] = useState([]);
  const [fetchedUser, setFetchedUser] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [round, setRound] = useState(1);
  const [remainingMoney, setRemainingMoney] = useState(0);
  // eslint-disable-next-line
  const [deductedAmount, setDeductedAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userName, setUserName] = useState('');
  const [creatingReport, setCreatingReport] = useState(false);
  const navigate = useNavigate();
  const {user} = useAuthContext()

  const handleLogOut = () => {
    logout();
    navigate('/login');
  };
  const fetchUserByUsername = async (userName) => {
    try {
      const response = await axios.get(`https://bingoproject-3.onrender.com/api/user/${userName}`);
      console.log('Fetched user by username:', response.data);
      setFetchedUser(response.data)
      // Handle the fetched user data as needed
    } catch (error) {
      console.error('Error fetching user by username:', error);
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
    const storedNumbers = localStorage.getItem('registeredNumbers');
    const storedAmount = localStorage.getItem('selectedAmount');
    const round = localStorage.getItem('roundsPlayed');

    if (storedNumbers) {
      setRegisteredNumbers(JSON.parse(storedNumbers));
    }
    if (round) {
      setRound(Number(round));
    }
    if (storedAmount) {
      setSelectedAmount(Number(storedAmount));
    }
    setUserName(user.userName);

    resetRoundCountIfNewDay();
// eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Calculate the total amount
    const total = registeredNumbers.length * selectedAmount;
    setTotalAmount(total);
  
    let deductionMultiplier = 1; // Default deduction multiplier for registered numbers 1-6
  
    // Update deduction multiplier based on the range of registered numbers
    if (registeredNumbers.length >= 7 && registeredNumbers.length <= 8) {
      deductionMultiplier = 1.5;
    } else if (registeredNumbers.length >= 9 && registeredNumbers.length <= 11) {
      deductionMultiplier = 2;
    } else if (registeredNumbers.length >= 12 && registeredNumbers.length <= 13) {
      deductionMultiplier = 2.5;
    } else if (registeredNumbers.length >= 14 && registeredNumbers.length <= 16) {
      deductionMultiplier = 3;
    }else if (registeredNumbers.length >= 17 && registeredNumbers.length <= 18) {
      deductionMultiplier = 3.5;
    }else if (registeredNumbers.length >= 19 && registeredNumbers.length <= 21) {
      deductionMultiplier = 4;
    }else if (registeredNumbers.length >= 22 && registeredNumbers.length <= 23) {
      deductionMultiplier = 4.5;
    }else if (registeredNumbers.length >= 24 && registeredNumbers.length <= 26) {
      deductionMultiplier = 5;
    }else if (registeredNumbers.length >= 27 && registeredNumbers.length <= 28) {
      deductionMultiplier = 5.5;
    }else if (registeredNumbers.length >= 29 && registeredNumbers.length <= 31) {
      deductionMultiplier = 6;
    }else if (registeredNumbers.length >= 32 && registeredNumbers.length <= 33) {
      deductionMultiplier = 6.5;
    }else if (registeredNumbers.length >= 34 && registeredNumbers.length <= 36) {
      deductionMultiplier = 7;
    }else if (registeredNumbers.length >= 37 && registeredNumbers.length <= 38) {
      deductionMultiplier = 7.5;
    }else if (registeredNumbers.length >= 39 && registeredNumbers.length <= 41) {
      deductionMultiplier = 8;
    }else if (registeredNumbers.length >= 42 && registeredNumbers.length <= 43) {
      deductionMultiplier = 8.5;
    }else if (registeredNumbers.length >= 44 && registeredNumbers.length <= 46) {
      deductionMultiplier = 9;
    }else if (registeredNumbers.length >= 47 && registeredNumbers.length <= 48) {
      deductionMultiplier = 9.5;
    }else if (registeredNumbers.length >= 49 && registeredNumbers.length <= 51) {
      deductionMultiplier = 10;
    }
  
    // Calculate the deducted amount
    let deducted = deductionMultiplier * selectedAmount;
    
    // If the deducted amount is odd, subtract 5
    if (deducted % 2 !== 0) {
      deducted -= 5;
    }
  
    setDeductedAmount(deducted);
  
    // Calculate the remaining money after deduction
    const remaining = totalAmount - deducted;
    setRemainingMoney(remaining);
  }, [registeredNumbers, selectedAmount, totalAmount]);
  useEffect(() => {
    const audio = new Audio(startAudio);
    audio.load(); // Preload the audio

    return () => {
      // Clean up the audio element
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    };
  }, []); // Empty dependency array to run only on mount

  const handleClick = async () => {
    try {
      console.log(userName)
      setCreatingReport(true);
      const newBalance = fetchedUser.balance - deductedAmount;
    
      // Update the user's balance using Axios PUT request
      const response = await axios.put(`https://bingoproject-3.onrender.com/api/user/update`, { userName, newBalance });
      
      console.log('Balance updated successfully:', response.data);
      localStorage.setItem('remainingMoney', remainingMoney);
      await createReport();
    } catch (error) {
      console.error('Report creation failed:', error);
      // Handle the error, e.g., show a message to the user
    }
    finally {
      setCreatingReport(false);
    }
  };

  const handleregisterClick = () => {
    navigate('/registerdcard');
  };
  const handleReportClick = () => {
    navigate('/report');
  };
  const resetRoundCountIfNewDay = () => {
    const lastResetDate = localStorage.getItem('lastResetDate');
    const currentDate = new Date().toLocaleDateString();

    if (lastResetDate !== currentDate) {
      localStorage.setItem('roundsPlayed', '1');
      localStorage.setItem('lastResetDate', currentDate);
    }
  };

  const createReport = async () => {
    try {
      const { data, error } = await supabase.from('report').insert([
        {
          round: round,
          selectedAmount: selectedAmount,
          deductedAmount: deductedAmount,
          userName: userName,
          winAmount: remainingMoney,
          noOfPlayer: registeredNumbers.length
        }
      ]);
  
      if (error) {
        console.error('Supabase error:', error.message);
        throw error;
      }

      console.log('Report created successfully:', data);
      const audio = new Audio(startAudio);
      audio.onended = () => {
        const roundsPlayed = JSON.parse(localStorage.getItem('roundsPlayed')) || 0;
        localStorage.setItem('roundsPlayed', roundsPlayed + 1);

        navigate('/randombingonumber');
      };

      audio.play();
      // Handle the response as needed
    } catch (error) {
      console.error('Error creating report:', error);
      // Handle errors
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.link}>
        <div onClickCapture={handleregisterClick}>RegisterCard</div>
        <div onClickCapture={handleReportClick}>Report</div>
        <div onClick={handleLogOut}>Logout</div>
        </div>
      <div className={styles.card}>
        <img src={BingoCard} alt="Bingo Card" />
      </div>
      <button onClick={handleClick} disabled={registeredNumbers.length === 0 || creatingReport} className={styles.button}>
        Start
      </button>
    </div>
  );
};

export default StartBingo;