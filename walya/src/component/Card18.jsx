import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
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
        B: [11, 1, 15, 3, 9],
        I: [28, 27, 25, 26, 23],
        N: [39, 41, 'free', 43, 34],
        G: [58, 53, 49, 52, 50],
        O: [70, 68, 67, 63, 75]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B11', 'B1', 'B15', 'B3', 'B9'], // First row (B)
        ['I28', 'I27', 'I25', 'I26', 'I23'], // Second row (I)
        ['N39', 'N41', 'free', 'N43', 'N34'], // Third row (N)
        ['G58', 'G53', 'G49', 'G52', 'G50'], // Fourth row (G)
        ['O70', 'O68', 'O67', 'O63', 'O75'], // Fifth row (O)
        ['B11', 'I27', 'free', 'G52', 'O75'], // Top-left to bottom-right diagonal
        ['O70', 'G53', 'free', 'I26', 'B9'], // Top-right to bottom-left diagonal
        ['B11', 'I28', 'N39', 'G58', 'O70'], // First column
        ['B1', 'I27', 'N41', 'G53', 'O68'], // Second column
        ['B15', 'I25', 'free', 'G49', 'O67'], // Third column
        ['B3', 'I26', 'N43', 'G52', 'O63'], // Fourth column
        ['B9', 'I23', 'N34', 'G50', 'O75']  // Fifth column
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
    winningNumbers.includes('B12') &&
    winningNumbers.includes('B6') &&
    winningNumbers.includes('O62') &&
    winningNumbers.includes('O70');
  return (
    <div className={styles.container}>
      <Replay/>
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