import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card17() {
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
        B: [7, 6, 11, 9, 5],
        I: [25, 21, 16, 18, 23],
        N: [36, 40, 'free', 44, 35],
        G: [49, 57, 51, 52, 59],
        O: [67, 61, 66, 70, 63]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B7', 'B6', 'B11', 'B9', 'B5'], // First row (B)
        ['I25', 'I21', 'I16', 'I18', 'I23'], // Second row (I)
        ['N36', 'N40', 'free', 'N44', 'N35'], // Third row (N)
        ['G49', 'G57', 'G51', 'G52', 'G59'], // Fourth row (G)
        ['O67', 'O61', 'O66', 'O70', 'O63'], // Fifth row (O)
        ['B7', 'I21', 'free', 'G52', 'O63'], // Top-left to bottom-right diagonal
        ['O67', 'G57', 'free', 'I18', 'B5'], // Top-right to bottom-left diagonal
        ['B7', 'I25', 'N36', 'G49', 'O67'], // First column
        ['B6', 'I21', 'N40', 'G57', 'O61'], // Second column
        ['B11', 'I16', 'free', 'G51', 'O66'], // Third column
        ['B9', 'I18', 'N44', 'G52', 'O70'], // Fourth column
        ['B5', 'I23', 'N35', 'G59', 'O63']  // Fifth column
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
    winningNumbers.includes('B4') &&
    winningNumbers.includes('B7') &&
    winningNumbers.includes('O71') &&
    winningNumbers.includes('O70');
  return (
    <div className={styles.container}>
      
                                          <div className={styles.current11}>
                                              <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                                                <h3>{currentNumber}</h3>
                                              </div>
                                            </div>
                                            <div className={styles.cont}>
                                            <div className={styles.cardnumber}>Card Number 17</div>
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

export default Card17;