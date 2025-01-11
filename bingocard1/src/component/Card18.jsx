import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card18() {
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
        B: [12, 2, 14, 4, 6],
        I: [26, 16, 20, 24, 19],
        N: [45, 43, 'free', 40, 37],
        G: [55, 60, 48, 51, 58],
        O: [62, 75, 72, 73, 70]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B12', 'B2', 'B14', 'B4', 'B6'], // First row (B)
        ['I26', 'I16', 'I20', 'I24', 'I19'], // Second row (I)
        ['N45', 'N43', 'free', 'N40', 'N37'], // Third row (N)
        ['G55', 'G60', 'G48', 'G51', 'G58'], // Fourth row (G)
        ['O62', 'O75', 'O72', 'O73', 'O70'], // Fifth row (O)
        ['B12', 'I16', 'free', 'G51', 'O70'], // Top-left to bottom-right diagonal
        ['O62', 'G60', 'free', 'I24', 'B6'], // Top-right to bottom-left diagonal
        ['B12', 'I26', 'N45', 'G55', 'O62'], // First column
        ['B2', 'I16', 'N43', 'G60', 'O75'], // Second column
        ['B14', 'I20', 'free', 'G48', 'O72'], // Third column
        ['B4', 'I24', 'N40', 'G51', 'O73'], // Fourth column
        ['B6', 'I19', 'N37', 'G58', 'O70'], // Fifth column
        ['B12', 'B6', 'O62', 'O70'] // Corner
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
    winningNumbers.includes('B12') &&
    winningNumbers.includes('B6') &&
    winningNumbers.includes('O62') &&
    winningNumbers.includes('O70');
  return (
    <div className={styles.container}>
                                          <div className={styles.current11}>
                                              <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                                                <h3>{currentNumber}</h3>
                                              </div>
                                            </div>
                                            <div className={styles.cont}>
                                            <div className={styles.cardnumber}>Card Number 18</div>
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

export default Card18;