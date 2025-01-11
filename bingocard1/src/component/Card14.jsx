import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card14() {
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
        B: [9, 14, 7, 2, 4],
        I: [26, 16, 21, 28, 24],
        N: [45, 33, 'free', 44, 35],
        G: [58, 52, 57, 56, 48],
        O: [68, 69, 75, 66, 71]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B9', 'B14', 'B7', 'B2', 'B4'], // First row (B)
        ['I26', 'I16', 'I21', 'I28', 'I24'], // Second row (I)
        ['N45', 'N33', 'free', 'N44', 'N35'], // Third row (N)
        ['G58', 'G52', 'G57', 'G56', 'G48'], // Fourth row (G)
        ['O68', 'O69', 'O75', 'O66', 'O71'], // Fifth row (O)
        ['B9', 'I16', 'free', 'G56', 'O71'], // Top-left to bottom-right diagonal
        ['O68', 'G52', 'free', 'I28', 'B4'], // Top-right to bottom-left diagonal
        ['B9', 'I26', 'N45', 'G58', 'O68'], // First column
        ['B14', 'I16', 'N33', 'G52', 'O69'], // Second column
        ['B7', 'I21', 'free', 'G57', 'O75'], // Third column
        ['B2', 'I28', 'N44', 'G56', 'O66'], // Fourth column
        ['B4', 'I24', 'N35', 'G48', 'O71'], // Fifth column
        ['B9', 'B4', 'O68', 'O71'] // Corner
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
    winningNumbers.includes('B4') &&
    winningNumbers.includes('O68') &&
    winningNumbers.includes('O71');
  return (
    <div className={styles.container}>
                                  <div className={styles.current11}>
                                      <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                                        <h3>{currentNumber}</h3>
                                      </div>
                                    </div>
                                    <div className={styles.cont}>
                                    <div className={styles.cardnumber}>Card Number 14</div>
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

export default Card14;