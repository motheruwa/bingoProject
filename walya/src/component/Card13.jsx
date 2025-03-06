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
        B: [7, 15, 3, 6, 5],
        I: [27, 28, 19, 18, 30],
        N: [41, 43, 'free', 31, 33],
        G: [48, 60, 59, 49, 46],
        O: [70, 72, 62, 64, 66]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B7', 'B15', 'B3', 'B6', 'B5'], // First row (B)
        ['I27', 'I28', 'I19', 'I18', 'I30'], // Second row (I)
        ['N41', 'N43', 'free', 'N31', 'N33'], // Third row (N)
        ['G48', 'G60', 'G59', 'G49', 'G46'], // Fourth row (G)
        ['O70', 'O72', 'O62', 'O64', 'O66'], // Fifth row (O)
        ['B7', 'I28', 'free', 'G49', 'O66'], // Top-left to bottom-right diagonal
        ['O70', 'G60', 'free', 'I18', 'B5'], // Top-right to bottom-left diagonal
        ['B7', 'I27', 'N41', 'G48', 'O70'], // First column
        ['B15', 'I28', 'N43', 'G60', 'O72'], // Second column
        ['B3', 'I19', 'free', 'G59', 'O62'], // Third column
        ['B6', 'I18', 'N31', 'G49', 'O64'], // Fourth column
        ['B5', 'I30', 'N33', 'G46', 'O66']  // Fifth column
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
    winningNumbers.includes('B13') &&
    winningNumbers.includes('B3') &&
    winningNumbers.includes('O71') &&
    winningNumbers.includes('O69');
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