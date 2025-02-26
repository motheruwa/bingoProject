import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card6() {
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
        B: [15, 10, 6, 9, 7],
        I: [18, 29, 27, 25, 23],
        N: [39, 42, 'free', 36, 44],
        G: [47, 48, 54, 49, 57],
        O: [73, 61, 72, 63, 67]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B15', 'B10', 'B6', 'B9', 'B7'], // First row (B)
        ['I18', 'I29', 'I27', 'I25', 'I23'], // Second row (I)
        ['N39', 'N42', 'free', 'N36', 'N44'], // Third row (N)
        ['G47', 'G48', 'G54', 'G49', 'G57'], // Fourth row (G)
        ['O73', 'O61', 'O72', 'O63', 'O67'], // Fifth row (O)
        ['B15', 'I29', 'free', 'G49', 'O67'], // Top-left to bottom-right diagonal
        ['O73', 'G48', 'free', 'I25', 'B7'], // Top-right to bottom-left diagonal
        ['B15', 'I18', 'N39', 'G47', 'O73'], // First column
        ['B10', 'I29', 'N42', 'G48', 'O61'], // Second column
        ['B6', 'I27', 'free', 'G54', 'O72'], // Third column
        ['B9', 'I25', 'N36', 'G49', 'O63'], // Fourth column
        ['B7', 'I23', 'N44', 'G57', 'O67']  // Fifth column
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
    winningNumbers.includes('B6') &&
    winningNumbers.includes('B2') &&
    winningNumbers.includes('O72') &&
    winningNumbers.includes('O73');
  return (
     <div className={styles.container}>
      <Replay/>
                  <div className={styles.current11}>
                      <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                        <h3>{currentNumber}</h3>
                      </div>
                    </div>
                    <div className={styles.cont}>
                    <div className={styles.cardnumber}>Card Number 6</div>
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

export default Card6;