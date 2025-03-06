import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card4() {
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
        B: [3, 13, 15, 2, 9],
        I: [27, 20, 28, 22, 26],
        N: [32, 43, 'free', 38, 35],
        G: [57, 46, 55, 52, 48],
        O: [69, 65, 67, 64, 63]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B3', 'B13', 'B15', 'B2', 'B9'], // First row (B)
        ['I27', 'I20', 'I28', 'I22', 'I26'], // Second row (I)
        ['N32', 'N43', 'free', 'N38', 'N35'], // Third row (N)
        ['G57', 'G46', 'G55', 'G52', 'G48'], // Fourth row (G)
        ['O69', 'O65', 'O67', 'O64', 'O63'], // Fifth row (O)
        ['B3', 'I20', 'free', 'G52', 'O63'], // Top-left to bottom-right diagonal
        ['O69', 'G46', 'free', 'I22', 'B9'], // Top-right to bottom-left diagonal
        ['B3', 'I27', 'N32', 'G57', 'O69'], // First column
        ['B13', 'I20', 'N43', 'G46', 'O65'], // Second column
        ['B15', 'I28', 'free', 'G55', 'O67'], // Third column
        ['B2', 'I22', 'N38', 'G52', 'O64'], // Fourth column
        ['B9', 'I26', 'N35', 'G48', 'O63'], // Fifth column
        ['B3', 'B9', 'O69', 'O63'] // Corner
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
    winningNumbers.includes('B3') &&
    winningNumbers.includes('B9') &&
    winningNumbers.includes('O69') &&
    winningNumbers.includes('O63');
  return (
     <div className={styles.container}>
      
              <div className={styles.current11}>
                  <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
                    <h3>{currentNumber}</h3>
                  </div>
                </div>
                <div className={styles.cont}>
                <div className={styles.cardnumber}>Card Number 4</div>
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

export default Card4;