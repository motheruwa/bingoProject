import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card5() {
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
        B: [14, 2, 11, 15, 6],
        I: [30, 29, 17, 25, 20],
        N: [31, 41, 'free', 38, 37],
        G: [57, 60, 54, 46, 52],
        O: [61, 62, 66, 63, 74]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B14', 'B2', 'B11', 'B15', 'B6'], // First row (B)
        ['I30', 'I29', 'I17', 'I25', 'I20'], // Second row (I)
        ['N31', 'N41', 'free', 'N38', 'N37'], // Third row (N)
        ['G57', 'G60', 'G54', 'G46', 'G52'], // Fourth row (G)
        ['O61', 'O62', 'O66', 'O63', 'O74'], // Fifth row (O)
        ['B14', 'I29', 'free', 'G46', 'O74'], // Top-left to bottom-right diagonal
        ['O61', 'G60', 'free', 'I25', 'B6'], // Top-right to bottom-left diagonal
        ['B14', 'I30', 'N31', 'G57', 'O61'], // First column
        ['B2', 'I29', 'N41', 'G60', 'O62'], // Second column
        ['B11', 'I17', 'free', 'G54', 'O66'], // Third column
        ['B15', 'I25', 'N38', 'G46', 'O63'], // Fourth column
        ['B6', 'I20', 'N37', 'G52', 'O74']  // Fifth column
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
    winningNumbers.includes('B1') &&
    winningNumbers.includes('O65') &&
    winningNumbers.includes('O62');
  return (
     <div className={styles.container}>
      <Replay/>
              <div className={styles.current11}>
                  <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                    <h3>{currentNumber}</h3>
                  </div>
                </div>
                <div className={styles.cont}>
                <div className={styles.cardnumber}>Card Number 5</div>
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

export default Card5;