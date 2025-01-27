import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card40() {
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
      B: [14, 10, 7, 15, 6],
      I: [17, 28, 16, 24, 29],
      N: [34, 43, 'free', 41, 36],
      G: [54, 55, 58, 59, 57],
      O: [63, 70, 71, 69, 64]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B14', 'B10', 'B7', 'B15', 'B6'], // First row
        ['I17', 'I28', 'I16', 'I24', 'I29'], // Second row
        ['N34', 'N43', 'free', 'N41', 'N36'], // Third row
        ['G54', 'G55', 'G58', 'G59', 'G57'], // Fourth row
        ['O63', 'O70', 'O71', 'O69', 'O64'], // Fifth row
        ['B14', 'I28', 'free', 'G59', 'O64'], // Top-left to bottom-right diagonal
        ['O63', 'G55', 'free', 'I24', 'B6'], // Top-right to bottom-left diagonal
        ['B14', 'I17', 'N34', 'G54', 'O63'], // First column
        ['B10', 'I28', 'N43', 'G55', 'O70'], // Second column
        ['B7', 'I16', 'free', 'G58', 'O71'], // Third column
        ['B15', 'I24', 'N41', 'G59', 'O69'], // Fourth column
        ['B6', 'I29', 'N36', 'G57', 'O64'], // Fifth column
        ['B14', 'B6', 'O63', 'O64'], // corner
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
  winningNumbers.includes('B14') &&
  winningNumbers.includes('B6') &&
  winningNumbers.includes('O63') &&
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
                               <div className={styles.cardnumber}>Card Number 40</div>
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

export default Card40;