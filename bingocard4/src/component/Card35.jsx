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
      B: [9, 14, 11, 8, 4],
      I: [17, 24, 18, 21, 27],
      N: [35, 45, 'free', 36, 37],
      G: [55, 52, 48, 47, 57],
      O: [72, 68, 66, 71, 70]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B9', 'B14', 'B11', 'B8', 'B4'], // First row
        ['I17', 'I24', 'I18', 'I21', 'I27'], // Second row
        ['N35', 'N45', 'free', 'N36', 'N37'], // Third row
        ['G55', 'G52', 'G48', 'G47', 'G57'], // Fourth row
        ['O72', 'O68', 'O66', 'O71', 'O70'], // Fifth row
        ['B9', 'I24', 'free', 'G47', 'O70'], // Top-left to bottom-right diagonal
        ['O72', 'G52', 'free', 'I21', 'B4'], // Top-right to bottom-left diagonal
        ['B9', 'I17', 'N35', 'G55', 'O72'], // First column
        ['B14', 'I24', 'N45', 'G52', 'O68'], // Second column
        ['B11', 'I18', 'free', 'G48', 'O66'], // Third column
        ['B8', 'I21', 'N36', 'G47', 'O71'], // Fourth column
        ['B4', 'I27', 'N37', 'G57', 'O70'], // Fifth column
        ['B9', 'B4', 'O72', 'O70'], // corner
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
  winningNumbers.includes('B9') &&
  winningNumbers.includes('B4') &&
  winningNumbers.includes('O72') &&
  winningNumbers.includes('O70');
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