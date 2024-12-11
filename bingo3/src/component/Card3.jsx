import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card3() {
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
      B: [14, 13, 3, 6, 10],
      I: [23, 25, 28, 30, 16],
      N: [40, 32, 'free', 44, 37],
      G: [58, 46, 50, 54, 53],
      O: [62, 65, 63, 66, 74]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B14', 'B13', 'B3', 'B6', 'B10'], // First row (B)
    ['I23', 'I25', 'I28', 'I30', 'I16'], // Second row (I)
    ['N40', 'N32', 'free', 'N44', 'N37'], // Third row (N)
    ['G58', 'G46', 'G50', 'G54', 'G53'], // Fourth row (G)
    ['O62', 'O65', 'O63', 'O66', 'O74'], // Fifth row (O)
    ['B14', 'I25', 'free', 'G54', 'O74'], // Top-left to bottom-right diagonal
    ['O62', 'G46', 'free', 'I30', 'B10'], // Top-right to bottom-left diagonal
    ['B14', 'I23', 'N40', 'G58', 'O62'], // First column
    ['B13', 'I25', 'N32', 'G46', 'O65'], // Second column
    ['B3', 'I28', 'free', 'G50', 'O63'], // Third column
    ['B6', 'I30', 'N44', 'G54', 'O66'], // Fourth column
    ['B10', 'I16', 'N37', 'G53', 'O74'], // Fifth column
    ['B14', 'B10', 'O62', 'O74'] // Corner
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
  winningNumbers.includes('B14') &&
  winningNumbers.includes('B10') &&
  winningNumbers.includes('O62') &&
  winningNumbers.includes('O74');
  return (
    <div className={styles.container}>
    <div className={styles.current11}>
        <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
          <h3>{currentNumber}</h3>
        </div>
      </div>
      <div className={styles.cont}>
      <div className={styles.cardnumber}>Card Number 3</div>
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

export default Card3;