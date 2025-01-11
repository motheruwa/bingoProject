import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card19() {
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
        B: [11, 13, 7, 3, 1],
        I: [18,30, 23, 16, 29],
        N: [45, 40, 'free', 44, 33],
        G: [47, 46, 55, 60, 53],
        O: [75, 63, 74, 70, 69]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B11', 'B13', 'B7', 'B3', 'B1'], // First row (B)
        ['I18', 'I30', 'I23', 'I16', 'I29'], // Second row (I)
        ['N45', 'N40', 'free', 'N44', 'N33'], // Third row (N)
        ['G47', 'G46', 'G55', 'G60', 'G53'], // Fourth row (G)
        ['O75', 'O63', 'O74', 'O70', 'O69'], // Fifth row (O)
        ['B11', 'I30', 'free', 'G60', 'O69'], // Top-left to bottom-right diagonal
        ['O75', 'G46', 'free', 'I16', 'B1'], // Top-right to bottom-left diagonal
        ['B11', 'I18', 'N45', 'G47', 'O75'], // First column
        ['B13', 'I30', 'N40', 'G46', 'O63'], // Second column
        ['B7', 'I23', 'free', 'G55', 'O74'], // Third column
        ['B3', 'I16', 'N44', 'G60', 'O70'], // Fourth column
        ['B1', 'I29', 'N33', 'G53', 'O69'], // Fifth column
        ['B11', 'B1', 'O75', 'O69'] // Corner
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
    winningNumbers.includes('B11') &&
    winningNumbers.includes('B1') &&
    winningNumbers.includes('O75') &&
    winningNumbers.includes('O69');
  return (
    <div className={styles.container}>
                                              <div className={styles.current11}>
                                                  <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                                                    <h3>{currentNumber}</h3>
                                                  </div>
                                                </div>
                                                <div className={styles.cont}>
                                                <div className={styles.cardnumber}>Card Number 19</div>
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

export default Card19;