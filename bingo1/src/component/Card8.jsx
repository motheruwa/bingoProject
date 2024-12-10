import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card8() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const [animateCurrent, setAnimateCurrent] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  useEffect(() => {
    if (calledNumbers.size > 0) {
      setCurrentNumber(Array.from(calledNumbers).pop());
    }
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
      B: [3, 11, 12, 6, 14],
      I: [24, 23, 21, 29, 26],
      N: [35, 40, 'free', 34, 44],
      G: [56, 50, 57, 47, 60],
      O: [61, 64, 74, 70, 62]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
       // Rows
  ['B3', 'B11', 'B12', 'B6', 'B14'], // First row (B)
  ['I24', 'I23', 'I21', 'I29', 'I26'], // Second row (I)
  ['N35', 'N40', 'free', 'N34', 'N44'], // Third row (N)
  ['G56', 'G50', 'G57', 'G47', 'G60'], // Fourth row (G)
  ['O61', 'O64', 'O74', 'O70', 'O62'], // Fifth row (O)

  // Columns
  ['B3', 'I24', 'N35', 'G56', 'O61'], // First column
  ['B11', 'I23', 'N40', 'G50', 'O64'], // Second column
  ['B12', 'I21', 'free', 'G57', 'O74'], // Third column
  ['B6', 'I29', 'N34', 'G47', 'O70'], // Fourth column
  ['B14', 'I26', 'N44', 'G60', 'O62'], // Fifth column

  // Diagonals
  ['B3', 'I23', 'free', 'G47', 'O62'], // Top-left to bottom-right diagonal
  ['B14', 'I29', 'free', 'G50', 'O61'], // Top-right to bottom-left diagonal

  // Corners
  ['B3', 'B14', 'O61', 'O62'] // Corners
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
  winningNumbers.includes('B3') &&
  winningNumbers.includes('B14') &&
  winningNumbers.includes('O61') &&
  winningNumbers.includes('O62');
  return (
    <div className={styles.container}>
      <div className={styles.current11}>
          <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
            <h3>{currentNumber}</h3>
          </div>
        </div>
        <div className={styles.cont}>
        <div className={styles.cardnumber}>Card Number 8</div>
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

export default Card8;