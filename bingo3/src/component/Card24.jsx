import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card24() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const [animateCurrent, setAnimateCurrent] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  useEffect(() => {
    if (calledNumbers.size > 0) {
      setCurrentNumber(Array.from(calledNumbers).pop());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setAnimateCurrent(true);
    
    
    const timeout = setTimeout(() => {
      setAnimateCurrent(false);
    }, 2000); // Duration of the 'current' animation
    
    return () => clearTimeout(timeout);
    }, [currentNumber]);
  const navigate = useNavigate();
  const generateBingoCard = () => {
    const bingoCard = {
      B: [9, 8, 1, 7, 12],
      I: [19, 26, 24, 20, 27],
      N: [40, 31, 'free', 39, 43],
      G: [46, 48, 59, 49, 57],
      O: [75, 67, 65, 70, 73]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ['B9', 'B8', 'B1', 'B7', 'B12'], // First row (B)
      ['I19', 'I26', 'I24', 'I20', 'I27'], // Second row (I)
      ['N40', 'N31', 'free', 'N39', 'N43'], // Third row (N)
      ['G46', 'G48', 'G59', 'G49', 'G57'], // Fourth row (G)
      ['O75', 'O67', 'O65', 'O70', 'O73'], // Fifth row (O)
      ['B9', 'I26', 'free', 'G49', 'O73'], // Top-left to bottom-right diagonal
      ['O75', 'G48', 'free', 'I20', 'B12'], // Top-right to bottom-left diagonal
      ['B9', 'I19', 'N40', 'G46', 'O75'], // First column
      ['B8', 'I26', 'N41', 'G48', 'O67'], // Second column
      ['B1', 'I24', 'free', 'G59', 'O65'], // Third column
      ['B7', 'I20', 'N39', 'G49', 'O70'], // Fourth column
      ['B12', 'I27', 'N43', 'G57', 'O73'], // Fifth column
      ['B9', 'B12', 'O75', 'O73'] // Corner 
    ];

    const winningLines = [];
    for (const condition of winConditions) {
      if (condition.every(char => calledNumbers.has(char))) {
        winningLines.push(condition);
      }
    }

    if (winningLines.length > 0) {
      const winningNumbers = [...new Set(winningLines.flat())];
      return winningNumbers;
    }

    return [];
  };

  const bingoCard = generateBingoCard();
  const winningNumbers = checkWin();


  const handleResetAndNavigate = () => {
    localStorage.removeItem('calledNumbers');
    localStorage.removeItem('registeredNumbers');

    navigate('/registerdcard');
  };

  
  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history stack
  };

  const audioWin = new Audio(Win);
  const audioNotwin = new Audio(Notwin);

  const playWinSound = () => {
    audioWin.play();
  };

  const playNotwinSound = () => {
    audioNotwin.play();
    audioNotwin.onended = function() {
        handleGoBack();
    };
};

  const isFourCornersWinning =
  winningNumbers.includes('B9') &&
  winningNumbers.includes('B12') &&
  winningNumbers.includes('O75') &&
  winningNumbers.includes('O73');
  return (
    <div className={styles.container}>
    <div className={styles.current11}>
        <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
          <h3>{currentNumber}</h3>
        </div>
      </div>
      <div className={styles.cont}>
      <div className={styles.cardnumber}>Card Number 24</div>
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.B}>B</th>
          <th className={styles.I}>I</th>
          <th className={styles.N}>N</th>
          <th className={styles.G}>G</th>
          <th className={styles.O}>O</th>
        </tr>
      </thead>
      <tbody>
      {[0, 1, 2, 3, 4].map((index) => (
        <tr key={index}>
          {Object.keys(bingoCard).map((letter) => {
            const number = bingoCard[letter][index];
            const isCalled = calledNumbers.has(`${letter}${number}`) || (number === 'free' && calledNumbers.has('free'));
            const isWinningNumber = winningNumbers.includes(`${letter}${number}`) || (number === 'free' && winningNumbers.includes('free'));
            const isCornerWinning = isFourCornersWinning && (letter === 'B' || letter === 'O') && (index === 0 || index === 4);

            const cellClassName = isWinningNumber
              ? isCornerWinning
                ? styles.cornerwinning
                : styles.winning
              : isCalled
              ? styles.called
              : '';
            return (
              <td >
                <div key={number} className={cellClassName}>
                {number}
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
    </table>
    <div className={styles.buttons}>
    <button onClick={playWinSound} className={styles.good}>Good Bingo</button>
    <button onClick={playNotwinSound} className={styles.add}>Not Bingo</button>
    <button onClick={ handleGoBack} className={styles.good}>Additional</button>
    <button onClick={handleResetAndNavigate} className={styles.add}>New Bingo</button>
    </div>
      </div>
    
    
  </div>
  );
}

export default Card24;