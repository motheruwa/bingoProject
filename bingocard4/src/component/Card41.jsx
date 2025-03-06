import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card41() {
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
      B: [5, 10, 9, 14, 6],
      I: [18, 21, 28, 25, 20],
      N: [31, 43, 'free', 40, 35],
      G: [52, 56, 59, 48, 47],
      O: [62, 66, 69, 67, 71]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B5', 'B10', 'B9', 'B14', 'B6'], // First row
        ['I18', 'I21', 'I28', 'I25', 'I20'], // Second row
        ['N31', 'N43', 'free', 'N40', 'N35'], // Third row
        ['G52', 'G56', 'G59', 'G48', 'G47'], // Fourth row
        ['O62', 'O66', 'O69', 'O67', 'O71'], // Fifth row
        ['B5', 'I21', 'free', 'G48', 'O71'], // Top-left to bottom-right diagonal
        ['O62', 'G56', 'free', 'I25', 'B6'], // Top-right to bottom-left diagonal
        ['B5', 'I18', 'N31', 'G52', 'O62'], // First column
        ['B10', 'I21', 'N43', 'G56', 'O66'], // Second column
        ['B9', 'I28', 'free', 'G59', 'O69'], // Third column
        ['B14', 'I25', 'N40', 'G48', 'O67'], // Fourth column
        ['B6', 'I20', 'N35', 'G47', 'O71'], // Fifth column
        ['B5', 'B6', 'O62', 'O71'], // corner
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
  winningNumbers.includes('B5') &&
  winningNumbers.includes('B6') &&
  winningNumbers.includes('O62') &&
  winningNumbers.includes('O71');
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
                                       <div className={styles.cardnumber}>Card Number 41</div>
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

export default Card41;