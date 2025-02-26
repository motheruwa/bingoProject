import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card30() {
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
        B: [3, 15, 12, 13, 6],
        I: [27, 28, 16, 26, 20],
        N: [39, 33, 'free', 32, 41],
        G: [56, 53, 58, 54, 51],
        O: [65, 75, 62, 71, 61]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B3', 'B15', 'B12', 'B13', 'B6'], // First row (B)
        ['I27', 'I28', 'I16', 'I26', 'I20'], // Second row (I)
        ['N39', 'N33', 'free', 'N32', 'N41'], // Third row (N)
        ['G56', 'G53', 'G58', 'G54', 'G51'], // Fourth row (G)
        ['O65', 'O75', 'O62', 'O71', 'O61'], // Fifth row (O)
        ['B3', 'I28', 'free', 'G54', 'O61'], // Top-left to bottom-right diagonal
        ['O65', 'G53', 'free', 'I26', 'B6'], // Top-right to bottom-left diagonal
        ['B3', 'I27', 'N39', 'G56', 'O65'], // First column
        ['B15', 'I28', 'N33', 'G53', 'O75'], // Second column
        ['B12', 'I16', 'free', 'G58', 'O62'], // Third column
        ['B13', 'I26', 'N32', 'G54', 'O71'], // Fourth column
        ['B6', 'I20', 'N41', 'G51', 'O61']  // Fifth column
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
    winningNumbers.includes('B7') &&
    winningNumbers.includes('O62') &&
    winningNumbers.includes('O64');
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
               <div className={styles.cardnumber}>Card Number 30</div>
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

export default Card30;