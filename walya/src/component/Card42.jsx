import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card42() {
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
        B: [15, 1, 4, 5, 8],
        I: [16, 22, 30, 26, 25],
        N: [45, 41, 'free', 44, 31],
        G: [60, 54,56, 51, 48],
        O: [67, 70, 62, 75, 71]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B15', 'B1', 'B4', 'B5', 'B8'], // First row (B)
        ['I16', 'I22', 'I30', 'I26', 'I25'], // Second row (I)
        ['N45', 'N41', 'free', 'N44', 'N31'], // Third row (N)
        ['G60', 'G54', 'G56', 'G51', 'G48'], // Fourth row (G)
        ['O67', 'O70', 'O62', 'O75', 'O71'], // Fifth row (O)
        ['B15', 'I22', 'free', 'G51', 'O71'], // Top-left to bottom-right diagonal
        ['O67', 'G54', 'free', 'I26', 'B8'], // Top-right to bottom-left diagonal
        ['B15', 'I16', 'N45', 'G60', 'O67'], // First column
        ['B1', 'I22', 'N41', 'G54', 'O70'], // Second column
        ['B4', 'I30', 'free', 'G56', 'O62'], // Third column
        ['B5', 'I26', 'N44', 'G51', 'O75'], // Fourth column
        ['B8', 'I25', 'N31', 'G48', 'O71']  // Fifth column
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
    winningNumbers.includes('B8') &&
    winningNumbers.includes('O62') &&
    winningNumbers.includes('O69');
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
                                   <div className={styles.cardnumber}>Card Number 42</div>
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

export default Card42;