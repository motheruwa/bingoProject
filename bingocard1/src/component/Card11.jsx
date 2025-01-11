import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card11() {
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
        B: [13, 14, 10, 2, 5],
        I: [21, 26, 24, 18, 19],
        N: [42, 40, 'free', 34, 35],
        G: [46, 57, 52, 60, 50],
        O: [65, 68, 67, 75, 73]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B13', 'B14', 'B10', 'B2', 'B5'], // First row (B)
        ['I21', 'I26', 'I24', 'I18', 'I19'], // Second row (I)
        ['N42', 'N40', 'free', 'N34', 'N35'], // Third row (N)
        ['G46', 'G57', 'G52', 'G60', 'G50'], // Fourth row (G)
        ['O65', 'O68', 'O67', 'O75', 'O73'], // Fifth row (O)
        ['B13', 'I26', 'free', 'G60', 'O73'], // Top-left to bottom-right diagonal
        ['O65', 'G57', 'free', 'I18', 'B5'], // Top-right to bottom-left diagonal
        ['B13', 'I21', 'N42', 'G46', 'O65'], // First column
        ['B14', 'I26', 'N40', 'G57', 'O68'], // Second column
        ['B10', 'I24', 'free', 'G52', 'O67'], // Third column
        ['B2', 'I18', 'N34', 'G60', 'O75'], // Fourth column
        ['B5', 'I19', 'N35', 'G50', 'O73'], // Fifth column
        ['B13', 'B5', 'O65', 'O73'] // Corner
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
    winningNumbers.includes('B13') &&
    winningNumbers.includes('B5') &&
    winningNumbers.includes('O65') &&
    winningNumbers.includes('O73');
  return (
    <div className={styles.container}>
                              <div className={styles.current11}>
                                  <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                                    <h3>{currentNumber}</h3>
                                  </div>
                                </div>
                                <div className={styles.cont}>
                                <div className={styles.cardnumber}>Card Number 11</div>
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

export default Card11;