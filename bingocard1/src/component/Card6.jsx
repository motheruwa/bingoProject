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
        B: [6, 1, 10, 14, 2],
        I: [18, 28, 25, 26, 19],
        N: [33, 35, 'free', 44, 43],
        G: [54, 58, 46, 53, 56],
        O: [72, 71, 65, 68, 73]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B6', 'B1', 'B10', 'B14', 'B2'], // First row (B)
        ['I18', 'I28', 'I25', 'I26', 'I19'], // Second row (I)
        ['N33', 'N35', 'free', 'N44', 'N43'], // Third row (N)
        ['G54', 'G58', 'G46', 'G53', 'G56'], // Fourth row (G)
        ['O72', 'O71', 'O65', 'O68', 'O73'], // Fifth row (O)
        ['B6', 'I28', 'free', 'G53', 'O73'], // Top-left to bottom-right diagonal
        ['O72', 'G58', 'free', 'I26', 'B2'], // Top-right to bottom-left diagonal
        ['B6', 'I18', 'N33', 'G54', 'O72'], // First column
        ['B1', 'I28', 'N35', 'G58', 'O71'], // Second column
        ['B10', 'I25', 'free', 'G46', 'O65'], // Third column
        ['B14', 'I26', 'N44', 'G53', 'O68'], // Fourth column
        ['B2', 'I19', 'N43', 'G56', 'O73'], // Fifth column
        ['B6', 'B2', 'O72', 'O73'] // Corner
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