import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card36() {
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
        B: [15, 3, 4, 8, 13],
        I: [20, 18, 28, 24, 22],
        N: [42, 44, 'free', 39, 31],
        G: [51, 47, 60, 49, 56],
        O: [70, 67, 74, 73, 75]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B15', 'B3', 'B4', 'B8', 'B13'], // First row (B)
        ['I20', 'I18', 'I28', 'I24', 'I22'], // Second row (I)
        ['N42', 'N44', 'free', 'N39', 'N31'], // Third row (N)
        ['G51', 'G47', 'G60', 'G49', 'G56'], // Fourth row (G)
        ['O70', 'O67', 'O74', 'O73', 'O75'], // Fifth row (O)
        ['B15', 'I18', 'free', 'G49', 'O75'], // Top-left to bottom-right diagonal
        ['O70', 'G47', 'free', 'I24', 'B13'], // Top-right to bottom-left diagonal
        ['B15', 'I20', 'N42', 'G51', 'O70'], // First column
        ['B3', 'I18', 'N44', 'G47', 'O67'], // Second column
        ['B4', 'I28', 'free', 'G60', 'O74'], // Third column
        ['B8', 'I24', 'N39', 'G49', 'O73'], // Fourth column
        ['B13', 'I22', 'N31', 'G56', 'O75']  // Fifth column
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
    winningNumbers.includes('B10') &&
    winningNumbers.includes('B5') &&
    winningNumbers.includes('O66') &&
    winningNumbers.includes('O64');
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
                       <div className={styles.cardnumber}>Card Number 36</div>
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

export default Card36;