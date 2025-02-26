import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card22() {
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
        B: [12, 7, 11, 9, 8],
        I: [18, 25, 23, 19, 22],
        N: [44, 40, 'free', 35, 37],
        G: [49, 56, 50, 55, 51],
        O: [64, 71, 62, 69, 73]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B12', 'B7', 'B11', 'B9', 'B8'], // First row (B)
        ['I18', 'I25', 'I23', 'I19', 'I22'], // Second row (I)
        ['N44', 'N40', 'free', 'N35', 'N37'], // Third row (N)
        ['G49', 'G56', 'G50', 'G55', 'G51'], // Fourth row (G)
        ['O64', 'O71', 'O62', 'O69', 'O73'], // Fifth row (O)
        ['B12', 'I25', 'free', 'G55', 'O73'], // Top-left to bottom-right diagonal
        ['O64', 'G56', 'free', 'I19', 'B8'], // Top-right to bottom-left diagonal
        ['B12', 'I18', 'N44', 'G49', 'O64'], // First column
        ['B7', 'I25', 'N40', 'G56', 'O71'], // Second column
        ['B11', 'I23', 'free', 'G50', 'O62'], // Third column
        ['B9', 'I19', 'N35', 'G55', 'O69'], // Fourth column
        ['B8', 'I22', 'N37', 'G51', 'O73']  // Fifth column
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
    winningNumbers.includes('B9') &&
    winningNumbers.includes('O62') &&
    winningNumbers.includes('O65');
  return (
    <div className={styles.container}>
      <Replay/>
                      <div className={styles.current11}>
                          <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                            <h3>{currentNumber}</h3>
                          </div>
                        </div>
                        <div className={styles.cont}>
                        <div className={styles.cardnumber}>Card Number 22</div>
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

export default Card22;