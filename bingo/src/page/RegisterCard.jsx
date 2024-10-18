import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/RegisterCard.module.css';

const RegisterCard = () => {
  const [registeredNumbers, setRegisteredNumbers] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(20);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedNumbers = localStorage.getItem('registeredNumbers');
    const storedAmount = localStorage.getItem('selectedAmount');
    const storedRounds = localStorage.getItem('roundsPlayed');

    if (storedNumbers) {
      setRegisteredNumbers(JSON.parse(storedNumbers));
    }

    if (!storedAmount) {
      setSelectedAmount(20);
      localStorage.setItem('selectedAmount', '20');
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
    localStorage.setItem('registeredNumbers', JSON.stringify(updatedNumbers));
  };

  const handleAmountChange = (event) => {
    const amount = parseInt(event.target.value);
    setSelectedAmount(amount);
    localStorage.setItem('selectedAmount', amount.toString());
  };

  const handlePlay = () => {
    navigate('/startbingo');
  };

  return (
    <div className={styles.container}>
      <div className={styles.cont}>
        <div className={styles.round}>Round {roundsPlayed}</div>
        <div className={styles.odd}>ካርድ ቁጥሮች</div>

        <div className={styles.numberscontainer}>
          {[...Array(50).keys()].map((number) => (
            <div
              key={number + 1}
              className={registeredNumbers.includes(number + 1) ? styles.registered : styles.unregistered}
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
            <select id="amount" value={selectedAmount} onChange={handleAmountChange}>
              <option value={10}>በ 10</option>
              <option value={20}>በ 20</option>
              <option value={30}>በ 30</option>
              <option value={40}>በ 40</option>
              <option value={50}>በ 50</option>
              <option value={100}>በ 100</option>
              <option value={150}>በ 150</option>
              <option value={200}>በ 200</option>
            </select>
          </div>
          
          <button className={styles.button} onClick={handlePlay}>Play</button>
        </div>
      )}
    </div>
  );
};

export default RegisterCard;