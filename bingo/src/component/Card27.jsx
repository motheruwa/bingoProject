import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
function Card27() {
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
        B: [9, 1, 12, 5, 11],
        I: [27, 28, 30, 24, 26],
        N: [43, 36, 'free', 35, 33],
        G: [51, 47, 56, 48, 46],
        O: [75, 62, 70, 69, 74]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B9', 'B1', 'B12', 'B5', 'B11'], // First row (B)
        ['I27', 'I28', 'I30', 'I24', 'I26'], // Second row (I)
        ['N43', 'N36', 'free', 'N35', 'N33'], // Third row (N)
        ['G51', 'G47', 'G56', 'G48', 'G46'], // Fourth row (G)
        ['O75', 'O62', 'O70', 'O69', 'O74'], // Fifth row (O)
        ['B9', 'I28', 'free', 'G48', 'O74'], // Top-left to bottom-right diagonal
        ['O75', 'G47', 'free', 'I24', 'B11'], // Top-right to bottom-left diagonal
        ['B9', 'I27', 'N43', 'G51', 'O75'], // First column
        ['B1', 'I28', 'N36', 'G47', 'O62'], // Second column
        ['B12', 'I30', 'free', 'G56', 'O70'], // Third column
        ['B5', 'I24', 'N35', 'G48', 'O69'], // Fourth column
        ['B11', 'I26', 'N33', 'G46', 'O74'], // Fifth column
        ['B9', 'B11', 'O75', 'O74'] // corner
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
    winningNumbers.includes('B11') &&
    winningNumbers.includes('O75') &&
    winningNumbers.includes('O74');
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
            <div className={styles.cardnumber}>Card Number 27</div>
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

export default Card27;