import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css';
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4';
import Notwin from '../audio/NOTWIN.mp4';

function Card7() {
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
      B: [1, 13, 10, 15, 8],
      I: [22, 26, 28, 24, 17],
      N: [42, 39, 'free', 31, 43],
      G: [47, 48, 50, 55, 46],
      O: [68, 67, 64, 65, 61]
    };

    bingoCard.N[2] = 'free'; // Set the center cell as a free space

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      // Rows
  ['B1', 'B13', 'B10', 'B15', 'B8'], // First row (B)
  ['I22', 'I26', 'I28', 'I24', 'I17'], // Second row (I)
  ['N42', 'N39', 'free', 'N31', 'N43'],  // Third row (N)
  ['G47', 'G48', 'G50', 'G55', 'G46'], // Fourth row (G)
  ['O68', 'O67', 'O64', 'O65', 'O61'], // Fifth row (O)

  // Columns
  ['B1', 'I22', 'N42', 'G47', 'O68'], // First column
  ['B13', 'I26', 'N39', 'G48', 'O67'], // Second column
  ['B10', 'I28', 'free', 'G50', 'O64'], // Third column
  ['B15', 'I24', 'N31', 'G55', 'O65'], // Fourth column
  ['B8', 'I17', 'N43', 'G46', 'O61'], // Fifth column

  // Diagonals
  ['B1', 'I26', 'free', 'G55', 'O61'], // Top-left to bottom-right diagonal
  ['B8', 'I24', 'free', 'G48', 'O68'], // Top-right to bottom-left diagonal

  // Corners
  ['B1', 'B8', 'O68', 'O61'] // Corners
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
  winningNumbers.includes('B1') &&
  winningNumbers.includes('B8') &&
  winningNumbers.includes('O68') &&
  winningNumbers.includes('O61');
  return (
    <div className={styles.container}>
      <div className={styles.current11}>
          <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
            <h3>{currentNumber}</h3>
          </div>
        </div>
        <div className={styles.cont}>
        <div className={styles.cardnumber}>Card Number 7</div>
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

export default Card7;