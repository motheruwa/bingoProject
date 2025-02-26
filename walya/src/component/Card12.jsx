import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card12() {
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
        B: [15, 13, 6, 7, 1],
        I: [23, 18, 28, 24, 30],
        N: [41, 31, 'free', 39, 33],
        G: [60, 52, 54, 49, 53],
        O: [63, 72, 67, 68, 70]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B15', 'B13', 'B6', 'B7', 'B1'], // First row (B)
        ['I23', 'I18', 'I28', 'I24', 'I30'], // Second row (I)
        ['N41', 'N31', 'free', 'N39', 'N33'], // Third row (N)
        ['G60', 'G52', 'G54', 'G49', 'G53'], // Fourth row (G)
        ['O63', 'O72', 'O67', 'O68', 'O70'], // Fifth row (O)
        ['B15', 'I18', 'free', 'G49', 'O70'], // Top-left to bottom-right diagonal
        ['O63', 'G52', 'free', 'I24', 'B1'], // Top-right to bottom-left diagonal
        ['B15', 'I23', 'N41', 'G60', 'O63'], // First column
        ['B13', 'I18', 'N31', 'G52', 'O72'], // Second column
        ['B6', 'I28', 'free', 'G54', 'O67'], // Third column
        ['B7', 'I24', 'N39', 'G49', 'O68'], // Fourth column
        ['B1', 'I30', 'N33', 'G53', 'O70']  // Fifth column
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
    winningNumbers.includes('B14') &&
    winningNumbers.includes('B6') &&
    winningNumbers.includes('O71') &&
    winningNumbers.includes('O64');
  return (
    <div className={styles.container}>
      <Replay/>
                              <div className={styles.current11}>
                                  <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                                    <h3>{currentNumber}</h3>
                                  </div>
                                </div>
                                <div className={styles.cont}>
                                <div className={styles.cardnumber}>Card Number 12</div>
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

export default Card12;