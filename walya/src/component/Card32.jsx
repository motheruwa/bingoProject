import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css';
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4';
import Notwin from '../audio/NOTWIN.mp4';
import Replay from './Replay';

function Card32() {
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
        B: [7, 14, 8, 1, 9],
        I: [24, 16, 29, 21, 17],
        N: [44, 42, 'free', 34, 33],
        G: [58, 60, 46, 59, 49],
        O: [69, 72, 74, 62, 75]
      };
  
      bingoCard.N[2] = 'free'; // Set the center cell as a free space
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B7', 'B14', 'B8', 'B1', 'B9'], // First row (B)
        ['I24', 'I16', 'I29', 'I21', 'I17'], // Second row (I)
        ['N44', 'N42', 'free', 'N34', 'N33'], // Third row (N)
        ['G58', 'G60', 'G46', 'G59', 'G49'], // Fourth row (G)
        ['O69', 'O72', 'O74', 'O62', 'O75'], // Fifth row (O)
        ['B7', 'I16', 'free', 'G59', 'O75'], // Top-left to bottom-right diagonal
        ['O69', 'G60', 'free', 'I21', 'B9'], // Top-right to bottom-left diagonal
        ['B7', 'I24', 'N44', 'G58', 'O69'], // First column
        ['B14', 'I16', 'N42', 'G60', 'O72'], // Second column
        ['B8', 'I29', 'free', 'G46', 'O74'], // Third column
        ['B1', 'I21', 'N34', 'G59', 'O62'], // Fourth column
        ['B9', 'I17', 'N33', 'G49', 'O75']  // Fifth column
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
    winningNumbers.includes('B7') &&
    winningNumbers.includes('B15') &&
    winningNumbers.includes('O73') &&
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
                   <div className={styles.cardnumber}>Card Number 32</div>
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

export default Card32;