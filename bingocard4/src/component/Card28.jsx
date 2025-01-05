import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card28() {
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
      B: [8, 2, 14, 9, 15],
      I: [17, 24, 16, 21, 18],
      N: [42, 39, 'free', 31, 35],
      G: [52, 56, 60, 47, 54],
      O: [74, 63, 62, 72, 70]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B8', 'B2', 'B14', 'B9', 'B15'], // First row
        ['I17', 'I24', 'I16', 'I21', 'I18'], // Second row
        ['N42', 'N39', 'free', 'N31', 'N35'], // Third row
        ['G52', 'G56', 'G60', 'G47', 'G54'], // Fourth row
        ['O74', 'O63', 'O62', 'O72', 'O70'], // Fifth row
        ['B8', 'I24', 'free', 'G47', 'O70'], // Top-left to bottom-right diagonal
        ['O74', 'G56', 'free', 'I21', 'B15'], // Top-right to bottom-left diagonal
        ['B8', 'I17', 'N42', 'G52', 'O74'], // First column
        ['B2', 'I24', 'N39', 'G56', 'O63'], // Second column
        ['B14', 'I16', 'free', 'G60', 'O62'], // Third column
        ['B9', 'I21', 'N31', 'G47', 'O72'], // Fourth column
        ['B15', 'I18', 'N35', 'G54', 'O70'], // Fifth column
        ['B8', 'B15', 'O74', 'O70'], // corner
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
  winningNumbers.includes('B8') &&
  winningNumbers.includes('B15') &&
  winningNumbers.includes('O74') &&
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
           <div className={styles.cardnumber}>Card Number 28</div>
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

export default Card28;