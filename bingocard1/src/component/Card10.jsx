import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card10() {
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
        B: [11, 14, 8, 1, 6],
        I: [24, 25, 26, 16, 17],
        N: [38, 44, 'free', 39, 41],
        G: [58, 53, 47, 56, 60],
        O: [75, 67, 62, 72, 61]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B11', 'B14', 'B8', 'B1', 'B6'], // First row (B)
        ['I24', 'I25', 'I26', 'I16', 'I17'], // Second row (I)
        ['N38', 'N44', 'free', 'N39', 'N41'], // Third row (N)
        ['G58', 'G53', 'G47', 'G56', 'G60'], // Fourth row (G)
        ['O75', 'O67', 'O62', 'O72', 'O61'], // Fifth row (O)
        ['B11', 'I25', 'free', 'G56', 'O61'], // Top-left to bottom-right diagonal
        ['O75', 'G53', 'free', 'I16', 'B6'], // Top-right to bottom-left diagonal
        ['B11', 'I24', 'N38', 'G58', 'O75'], // First column
        ['B14', 'I25', 'N44', 'G53', 'O67'], // Second column
        ['B8', 'I26', 'free', 'G47', 'O62'], // Third column
        ['B1', 'I16', 'N39', 'G56', 'O72'], // Fourth column
        ['B6', 'I17', 'N41', 'G60', 'O61'], // Fifth column
        ['B11', 'B6', 'O75', 'O61'] // Corner
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
    winningNumbers.includes('B6') &&
    winningNumbers.includes('O75') &&
    winningNumbers.includes('O61');
  return (
    <div className={styles.container}>
                          <div className={styles.current11}>
                              <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                                <h3>{currentNumber}</h3>
                              </div>
                            </div>
                            <div className={styles.cont}>
                            <div className={styles.cardnumber}>Card Number 10</div>
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

export default Card10;