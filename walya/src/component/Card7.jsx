import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
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
        B: [1, 2, 3, 5, 8],
        I: [20, 21, 28, 24, 16],
        N: [37, 34, 'free', 41, 44],
        G: [55, 49, 56, 59, 47],
        O: [74, 66, 63, 65, 67]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B1', 'B2', 'B3', 'B5', 'B8'], // First row (B)
        ['I20', 'I21', 'I28', 'I24', 'I16'], // Second row (I)
        ['N37', 'N34', 'free', 'N41', 'N44'], // Third row (N)
        ['G55', 'G49', 'G56', 'G59', 'G47'], // Fourth row (G)
        ['O74', 'O66', 'O63', 'O65', 'O67'], // Fifth row (O)
        ['B1', 'I21', 'free', 'G59', 'O67'], // Top-left to bottom-right diagonal
        ['O74', 'G49', 'free', 'I24', 'B8'], // Top-right to bottom-left diagonal
        ['B1', 'I20', 'N37', 'G55', 'O74'], // First column
        ['B2', 'I21', 'N34', 'G49', 'O66'], // Second column
        ['B3', 'I28', 'free', 'G56', 'O63'], // Third column
        ['B5', 'I24', 'N41', 'G59', 'O65'], // Fourth column
        ['B8', 'I16', 'N44', 'G47', 'O67']  // Fifth column
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
    winningNumbers.includes('B4') &&
    winningNumbers.includes('O69') &&
    winningNumbers.includes('O68');
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