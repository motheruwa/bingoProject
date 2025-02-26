import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
function Card44() {
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
        B: [12, 8, 7, 1, 5],
        I: [19, 16, 26,17, 29],
        N: [44, 42, 'free', 45, 38],
        G: [46, 48, 56, 58, 54],
        O: [61, 71, 67, 64, 74]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B12', 'B8', 'B7', 'B1', 'B5'], // First row (B)
        ['I19', 'I16', 'I26', 'I17', 'I29'], // Second row (I)
        ['N44', 'N42', 'free', 'N45', 'N38'], // Third row (N)
        ['G46', 'G48', 'G56', 'G58', 'G54'], // Fourth row (G)
        ['O61', 'O71', 'O67', 'O64', 'O74'], // Fifth row (O)
        ['B12', 'I16', 'free', 'G58', 'O74'], // Top-left to bottom-right diagonal
        ['O61', 'G48', 'free', 'I17', 'B5'], // Top-right to bottom-left diagonal
        ['B12', 'I19', 'N44', 'G46', 'O61'], // First column
        ['B8', 'I16', 'N42', 'G48', 'O71'], // Second column
        ['B7', 'I26', 'free', 'G56', 'O67'], // Third column
        ['B1', 'I17', 'N45', 'G58', 'O64'], // Fourth column
        ['B5', 'I29', 'N38', 'G54', 'O74']  // Fifth column
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
    winningNumbers.includes('B5') &&
    winningNumbers.includes('O62') &&
    winningNumbers.includes('O69');
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
                                       <div className={styles.cardnumber}>Card Number 44</div>
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

export default Card44;