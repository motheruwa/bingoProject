import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card72() {
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
      B: [7, 9, 3, 1, 10],
      I: [26, 21, 28, 24, 23],
      N: [39, 32, 'free', 45, 44],
      G: [55, 49, 46, 51, 53],
      O: [73, 66, 69, 71, 63]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      // Rows
    ['B7', 'B9', 'B3', 'B1', 'B10'], // First row (B)
    ['I26', 'I21', 'I28', 'I24', 'I23'], // Second row (I)
    ['N39', 'N32', 'Nfree', 'N45', 'N44'], // Third row (N)
    ['G55', 'G49', 'G46', 'G51', 'G53'], // Fourth row (G)
    ['O73', 'O66', 'O69', 'O71', 'O63'], // Fifth row (O)

    // Columns
    ['B7', 'I26', 'N39', 'G55', 'O73'], // First column
    ['B9', 'I21', 'N32', 'G49', 'O66'], // Second column
    ['B3', 'I28', 'Nfree', 'G46', 'O69'], // Third column
    ['B1', 'I24', 'N45', 'G51', 'O71'], // Fourth column
    ['B10', 'I23', 'N44', 'G53', 'O63'], // Fifth column

    // Diagonals
    ['B7', 'I21', 'Nfree', 'G51', 'O63'], // Top-left to bottom-right diagonal
    ['B10', 'I24', 'Nfree', 'G46', 'O73'], // Top-right to bottom-left diagonal

    // Corners
    ['B7', 'B10', 'O73', 'O63'] // Corners

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
  winningNumbers.includes('B7') &&
  winningNumbers.includes('B10') &&
  winningNumbers.includes('O73') &&
  winningNumbers.includes('O63');
  return (
    <div className={styles.container}>
      <div className={styles.current11}>
          <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
            <h3>{currentNumber}</h3>
          </div>
        </div>
        <div className={styles.cont}>
        <div className={styles.cardnumber}>Card Number 72</div>
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

export default Card72;