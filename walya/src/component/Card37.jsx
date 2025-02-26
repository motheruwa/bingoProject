import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card37() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get('calledNumbers')));
  const [animateCurrent, setAnimateCurrent] = useState(false);
            const [currentNumber, setCurrentNumber] = useState("");
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
        B: [12, 1, 4, 8, 6],
        I: [27, 22, 24, 21, 20],
        N: [44, 37, 'free', 43, 41],
        G: [55, 51, 57, 53, 54],
        O: [69, 63, 64, 71, 70]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B12', 'B1', 'B4', 'B8', 'B6'], // First row (B)
        ['I27', 'I22', 'I24', 'I21', 'I20'], // Second row (I)
        ['N44', 'N37', 'free', 'N43', 'N41'], // Third row (N)
        ['G55', 'G51', 'G57', 'G53', 'G54'], // Fourth row (G)
        ['O69', 'O63', 'O64', 'O71', 'O70'], // Fifth row (O)
        ['B12', 'I22', 'free', 'G53', 'O70'], // Top-left to bottom-right diagonal
        ['O69', 'G51', 'free', 'I21', 'B6'], // Top-right to bottom-left diagonal
        ['B12', 'I27', 'N44', 'G55', 'O69'], // First column
        ['B1', 'I22', 'N37', 'G51', 'O63'], // Second column
        ['B4', 'I24', 'free', 'G57', 'O64'], // Third column
        ['B8', 'I21', 'N43', 'G53', 'O71'], // Fourth column
        ['B6', 'I20', 'N41', 'G54', 'O70']  // Fifth column
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
    winningNumbers.includes('B12') &&
    winningNumbers.includes('O68') &&
    winningNumbers.includes('O71');

  return (
    <div className={styles.container}>
      <Replay/>

                         <div className={styles.current11}>
                           <div
                             className={`${styles.current} ${
                               animateCurrent ? styles.animated : ""
                             }`}
                           >
                             <h3>{currentNumber}</h3>
                           </div>
                         </div>
                         <div className={styles.cont}>
                           <div className={styles.cardnumber}>Card Number 37</div>
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
                                     const isCalled =
                                       calledNumbers.has(`${letter}${number}`) ||
                                       (number === "free" && calledNumbers.has("free"));
                                     const isWinningNumber =
                                       winningNumbers.includes(`${letter}${number}`) ||
                                       (number === "free" && winningNumbers.includes("free"));
                                     const isCornerWinning =
                                       isFourCornersWinning &&
                                       (letter === "B" || letter === "O") &&
                                       (index === 0 || index === 4);
                   
                                     const cellClassName = isWinningNumber
                                       ? isCornerWinning
                                         ? styles.cornerwinning
                                         : styles.winning
                                       : isCalled
                                       ? styles.called
                                       : "";
                                     return (
                                       <td>
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
                             <button onClick={playWinSound} className={styles.good}>
                               Good Bingo
                             </button>
                             <button onClick={playNotwinSound} className={styles.add}>
                               Not Bingo
                             </button>
                             <button onClick={handleGoBack} className={styles.good}>
                               Additional
                             </button>
                             <button onClick={handleResetAndNavigate} className={styles.add}>
                               New Bingo
                             </button>
                           </div>
                         </div>
                       </div>
  );
}

export default Card37;