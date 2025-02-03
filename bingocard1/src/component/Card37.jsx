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
        B: [11, 15, 9, 3, 12],
        I: [27, 24, 21, 30, 29],
        N: [39, 41, 'free', 43, 42],
        G: [55, 60, 56, 47, 57],
        O: [68, 67, 61, 75, 71]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B11', 'B15', 'B9', 'B3', 'B12'], // First row (B)
        ['I27', 'I24', 'I21', 'I30', 'I29'], // Second row (I)
        ['N39', 'N41', 'free', 'N43', 'N42'], // Third row (N)
        ['G55', 'G60', 'G56', 'G47', 'G57'], // Fourth row (G)
        ['O68', 'O67', 'O61', 'O75', 'O71'], // Fifth row (O)
        ['B11', 'I24', 'free', 'G47', 'O71'], // Top-left to bottom-right diagonal
        ['O68', 'G60', 'free', 'I30', 'B12'], // Top-right to bottom-left diagonal
        ['B11', 'I27', 'N39', 'G55', 'O68'], // First column
        ['B15', 'I24', 'N41', 'G60', 'O67'], // Second column
        ['B9', 'I21', 'free', 'G56', 'O61'], // Third column
        ['B3', 'I30', 'N43', 'G47', 'O75'], // Fourth column
        ['B12', 'I29', 'N42', 'G57', 'O71'], // Fifth column
        ['B11', 'B12', 'O68', 'O71'], // corner
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