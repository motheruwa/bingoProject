import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card13() {
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
      B: [11, 1, 4, 9, 14],
      I: [16, 26, 29, 28, 23],
      N: [45, 44, 'free', 31, 40],
      G: [60, 55, 47, 51, 59],
      O: [73, 69, 72, 64, 68]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B11', 'B1', 'B4', 'B9', 'B14'], // First row (B)
    ['I16', 'I26', 'I29', 'I28', 'I23'], // Second row (I)
    ['N45', 'N44', 'free', 'N31', 'N40'], // Third row (N)
    ['G60', 'G55', 'G47', 'G51', 'G59'], // Fourth row (G)
    ['O73', 'O69', 'O72', 'O64', 'O68'], // Fifth row (O)
    ['B11', 'I26', 'free', 'G51', 'O68'], // Top-left to bottom-right diagonal
    ['O73', 'G55', 'free', 'I28', 'B14'], // Top-right to bottom-left diagonal
    ['B11', 'I16', 'N45', 'G60', 'O73'], // First column
    ['B1', 'I26', 'N44', 'G55', 'O69'], // Second column
    ['B4', 'I29', 'free', 'G47', 'O72'], // Third column
    ['B9', 'I28', 'N31', 'G51', 'O64'], // Fourth column
    ['B14', 'I23', 'N40', 'G59', 'O68'], // Fifth column
    ['B11', 'B14', 'O73', 'O68'] // Corner
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
    localStorage.removeItem('sequenceIndex');

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
  winningNumbers.includes('B11') &&
  winningNumbers.includes('B14') &&
  winningNumbers.includes('O73') &&
  winningNumbers.includes('O68');
  return (
    <div className={styles.container}>
      

                                  <div className={styles.current11}>
                                      <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                                        <h3>{currentNumber}</h3>
                                      </div>
                                    </div>
                                    <div className={styles.cont}>
                                    <div className={styles.cardnumber}>Card Number 13</div>
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

export default Card13;