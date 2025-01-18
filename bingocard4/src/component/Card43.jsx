import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card43() {
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
      B: [15, 6, 13, 8, 7],
      I: [18, 19, 16, 27, 29],
      N: [44, 31, 'free', 35, 38],
      G: [54, 56, 60, 55, 57],
      O: [69, 64, 70, 66, 72]
    };

    // Set the center cell as a free space
    bingoCard.N[2] = 'free';

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ['B15', 'B6', 'B13', 'B8', 'B7'], // First row
        ['I18', 'I19', 'I16', 'I27', 'I29'], // Second row
        ['N44', 'N31', 'free', 'N35', 'N38'], // Third row
        ['G54', 'G56', 'G60', 'G55', 'G57'], // Fourth row
        ['O69', 'O64', 'O70', 'O66', 'O72'], // Fifth row
        ['B15', 'I19', 'free', 'G55', 'O72'], // Top-left to bottom-right diagonal
        ['O69', 'G56', 'free', 'I27', 'B7'], // Top-right to bottom-left diagonal
        ['B15', 'I18', 'N44', 'G54', 'O69'], // First column
        ['B6', 'I19', 'N31', 'G56', 'O64'], // Second column
        ['B13', 'I16', 'free', 'G60', 'O70'], // Third column
        ['B8', 'I27', 'N35', 'G55', 'O66'], // Fourth column
        ['B7', 'I29', 'N38', 'G57', 'O72'], // Fifth column
        ['B15', 'B7', 'O69', 'O72'], // corner
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
  winningNumbers.includes('B15') &&
  winningNumbers.includes('B7') &&
  winningNumbers.includes('O69') &&
  winningNumbers.includes('O72');
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
                                       <div className={styles.cardnumber}>Card Number 43</div>
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

export default Card43;