import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card35() {
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
        B: [8, 1, 11, 3,5],
        I: [20, 23, 19, 28, 27],
        N: [35, 38, 'free', 43, 41],
        G: [50, 53, 51, 56, 59],
        O: [70, 73, 68, 67, 63]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B8', 'B1', 'B11', 'B3', 'B5'], // First row (B)
        ['I20', 'I23', 'I19', 'I28', 'I27'], // Second row (I)
        ['N35', 'N38', 'free', 'N43', 'N41'], // Third row (N)
        ['G50', 'G53', 'G51', 'G56', 'G59'], // Fourth row (G)
        ['O70', 'O73', 'O68', 'O67', 'O63'], // Fifth row (O)
        ['B8', 'I23', 'free', 'G56', 'O63'], // Top-left to bottom-right diagonal
        ['O70', 'G53', 'free', 'I28', 'B5'], // Top-right to bottom-left diagonal
        ['B8', 'I20', 'N35', 'G50', 'O70'], // First column
        ['B1', 'I23', 'N38', 'G53', 'O73'], // Second column
        ['B11', 'I19', 'free', 'G51', 'O68'], // Third column
        ['B3', 'I28', 'N43', 'G56', 'O67'], // Fourth column
        ['B5', 'I27', 'N41', 'G59', 'O63']  // Fifth column
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
    winningNumbers.includes('B8') &&
    winningNumbers.includes('B15') &&
    winningNumbers.includes('O69') &&
    winningNumbers.includes('O67');
  return (
    <div className={styles.container}>
      

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
                       <div className={styles.cardnumber}>Card Number 35</div>
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

export default Card35;