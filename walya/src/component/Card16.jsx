import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card16() {
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
       B: [5, 12, 9, 7, 6],
       I: [20, 19, 17, 29, 16],
       N: [32, 40, 'free', 45, 41],
       G: [50, 55, 60, 47, 49],
       O: [61, 75, 72, 66, 63]
     };
 
     // Set the center cell as a free space
     bingoCard.N[2] = 'free';
 
     return bingoCard;
   };
 
   const checkWin = () => {
    const winConditions = [
      ['B5', 'B12', 'B9', 'B7', 'B6'], // First row (B)
      ['I20', 'I19', 'I17', 'I29', 'I16'], // Second row (I)
      ['N32', 'N40', 'free', 'N45', 'N41'], // Third row (N)
      ['G50', 'G55', 'G60', 'G47', 'G49'], // Fourth row (G)
      ['O61', 'O75', 'O72', 'O66', 'O63'], // Fifth row (O)
      ['B5', 'I19', 'free', 'G47', 'O63'], // Top-left to bottom-right diagonal
      ['O61', 'G55', 'free', 'I29', 'B6'], // Top-right to bottom-left diagonal
      ['B5', 'I20', 'N32', 'G50', 'O61'], // First column
      ['B12', 'I19', 'N40', 'G55', 'O75'], // Second column
      ['B9', 'I17', 'free', 'G60', 'O72'], // Third column
      ['B7', 'I29', 'N45', 'G47', 'O66'], // Fourth column
      ['B6', 'I16', 'N41', 'G49', 'O63']  // Fifth column
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
   winningNumbers.includes('B8') &&
   winningNumbers.includes('B3') &&
   winningNumbers.includes('O74') &&
   winningNumbers.includes('O71');
  return (
     <div className={styles.container}>
      
                                      <div className={styles.current11}>
                                          <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                                            <h3>{currentNumber}</h3>
                                          </div>
                                        </div>
                                        <div className={styles.cont}>
                                        <div className={styles.cardnumber}>Card Number 16</div>
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

export default Card16;