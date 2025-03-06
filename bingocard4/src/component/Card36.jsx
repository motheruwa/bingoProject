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
      B: [2, 13, 15, 4, 10],
      I: [22, 21, 30, 26, 29],
      N: [41, 45, 'free', 39, 34],
      G: [54, 51, 47, 50, 58],
      O: [62, 70, 63, 75, 64]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B2', 'B13', 'B15', 'B4', 'B10'], // First row
        ['I22', 'I21', 'I30', 'I26', 'I29'], // Second row
        ['N41', 'N45', 'free', 'N39', 'N34'], // Third row
        ['G54', 'G51', 'G47', 'G50', 'G58'], // Fourth row
        ['O62', 'O70', 'O63', 'O75', 'O64'], // Fifth row
        ['B2', 'I21', 'free', 'G50', 'O64'], // Top-left to bottom-right diagonal
        ['O62', 'G51', 'free', 'I26', 'B10'], // Top-right to bottom-left diagonal
        ['B2', 'I22', 'N41', 'G54', 'O62'], // First column
        ['B13', 'I21', 'N45', 'G51', 'O70'], // Second column
        ['B15', 'I30', 'free', 'G47', 'O63'], // Third column
        ['B4', 'I26', 'N39', 'G50', 'O75'], // Fourth column
        ['B10', 'I29', 'N34', 'G58', 'O64'], // Fifth column
        ['B2', 'B10', 'O62', 'O64'], // corner
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
  winningNumbers.includes('B10') &&
  winningNumbers.includes('O62') &&
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