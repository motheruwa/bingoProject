import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card33() {
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
        B: [14, 7, 12, 9, 13],
        I: [26, 18, 25, 20, 19],
        N: [33, 44, 'free', 45, 42],
        G: [47, 55, 52, 56, 51],
        O: [69, 67, 65, 73, 62]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B14', 'B7', 'B12', 'B9', 'B13'], // First row (B)
        ['I26', 'I18', 'I25', 'I20', 'I19'], // Second row (I)
        ['N33', 'N44', 'free', 'N45', 'N42'], // Third row (N)
        ['G47', 'G55', 'G52', 'G56', 'G51'], // Fourth row (G)
        ['O69', 'O67', 'O65', 'O73', 'O62'], // Fifth row (O)
        ['B14', 'I18', 'free', 'G56', 'O62'], // Top-left to bottom-right diagonal
        ['O69', 'G55', 'free', 'I20', 'B13'], // Top-right to bottom-left diagonal
        ['B14', 'I26', 'N33', 'G47', 'O69'], // First column
        ['B7', 'I18', 'N44', 'G55', 'O67'], // Second column
        ['B12', 'I25', 'free', 'G52', 'O65'], // Third column
        ['B9', 'I20', 'N45', 'G56', 'O73'], // Fourth column
        ['B13', 'I19', 'N42', 'G51', 'O62']  // Fifth column
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
    winningNumbers.includes('B2') &&
    winningNumbers.includes('B15') &&
    winningNumbers.includes('O62') &&
    winningNumbers.includes('O66');
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
                   <div className={styles.cardnumber}>Card Number 33</div>
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

export default Card33;