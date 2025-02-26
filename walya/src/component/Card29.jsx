import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card29() {
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
        B: [4, 8, 1, 7, 10],
        I: [29, 28, 17, 22, 23],
        N: [44, 37, 'free', 42, 35],
        G: [50, 51, 52, 57, 53],
        O: [61, 66, 68, 70, 71]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B4', 'B8', 'B1', 'B7', 'B10'], // First row (B)
        ['I29', 'I28', 'I17', 'I22', 'I23'], // Second row (I)
        ['N44', 'N37', 'free', 'N42', 'N35'], // Third row (N)
        ['G50', 'G51', 'G52', 'G57', 'G53'], // Fourth row (G)
        ['O61', 'O66', 'O68', 'O70', 'O71'], // Fifth row (O)
        ['B4', 'I28', 'free', 'G57', 'O71'], // Top-left to bottom-right diagonal
        ['O61', 'G51', 'free', 'I22', 'B10'], // Top-right to bottom-left diagonal
        ['B4', 'I29', 'N44', 'G50', 'O61'], // First column
        ['B8', 'I28', 'N37', 'G51', 'O66'], // Second column
        ['B1', 'I17', 'free', 'G52', 'O68'], // Third column
        ['B7', 'I22', 'N42', 'G57', 'O70'], // Fourth column
        ['B10', 'I23', 'N35', 'G53', 'O71']  // Fifth column
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
    winningNumbers.includes('B1') &&
    winningNumbers.includes('B12') &&
    winningNumbers.includes('O74') &&
    winningNumbers.includes('O75');
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
               <div className={styles.cardnumber}>Card Number 29</div>
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

export default Card29;