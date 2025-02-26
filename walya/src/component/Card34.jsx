import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card34() {
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
        B: [11, 3, 15, 13, 2],
        I: [16, 17, 27, 25, 24],
        N: [33, 38, 'free', 36, 32],
        G: [56, 58, 50, 57, 52],
        O: [74, 73, 67, 66, 65]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B11', 'B3', 'B15', 'B13', 'B2'], // First row (B)
        ['I16', 'I17', 'I27', 'I25', 'I24'], // Second row (I)
        ['N33', 'N38', 'free', 'N36', 'N32'], // Third row (N)
        ['G56', 'G58', 'G50', 'G57', 'G52'], // Fourth row (G)
        ['O74', 'O73', 'O67', 'O66', 'O65'], // Fifth row (O)
        ['B11', 'I17', 'free', 'G57', 'O65'], // Top-left to bottom-right diagonal
        ['O74', 'G58', 'free', 'I25', 'B2'], // Top-right to bottom-left diagonal
        ['B11', 'I16', 'N33', 'G56', 'O74'], // First column
        ['B3', 'I17', 'N38', 'G58', 'O73'], // Second column
        ['B15', 'I27', 'free', 'G50', 'O67'], // Third column
        ['B13', 'I25', 'N36', 'G57', 'O66'], // Fourth column
        ['B2', 'I24', 'N32', 'G52', 'O65']  // Fifth column
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
    winningNumbers.includes('B8') &&
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
                   <div className={styles.cardnumber}>Card Number 34</div>
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

export default Card34;