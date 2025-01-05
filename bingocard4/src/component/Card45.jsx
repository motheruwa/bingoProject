import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card45() {
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
      B: [9, 6, 7, 11, 8],
      I: [27, 20, 19, 22, 17],
      N: [39, 38, 'free', 35, 45],
      G: [48, 51, 55, 46, 47],
      O: [70, 63, 68, 74, 69]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B9', 'B6', 'B7', 'B11', 'B8'], // First row
        ['I27', 'I20', 'I19', 'I22', 'I17'], // Second row
        ['N39', 'N38', 'free', 'N35', 'N45'], // Third row
        ['G48', 'G51', 'G55', 'G46', 'G47'], // Fourth row
        ['O70', 'O63', 'O68', 'O74', 'O69'], // Fifth row
        ['B9', 'I20', 'free', 'G46', 'O69'], // Top-left to bottom-right diagonal
        ['O70', 'G51', 'free', 'I22', 'B8'], // Top-right to bottom-left diagonal
        ['B9', 'I27', 'N39', 'G48', 'O70'], // First column
        ['B6', 'I20', 'N38', 'G51', 'O63'], // Second column
        ['B7', 'I19', 'free', 'G55', 'O68'], // Third column
        ['B11', 'I22', 'N35', 'G46', 'O74'], // Fourth column
        ['B8', 'I17', 'N45', 'G47', 'O69'], // Fifth column
        ['B9', 'B8', 'O70', 'O69'], 
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
  winningNumbers.includes('B8') &&
  winningNumbers.includes('O70') &&
  winningNumbers.includes('O69');

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
                                           <div className={styles.cardnumber}>Card Number 45</div>
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

export default Card45;