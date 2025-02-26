import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/Card.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom';
import Win from '../audio/WIN.mp4'
import Notwin from '../audio/NOTWIN.mp4'
import Replay from './Replay';
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
        B: [9, 13, 6,11, 5],
        I: [26, 18, 27, 16, 29],
        N: [45, 31, 'free', 42, 35],
        G: [47, 51, 59, 60, 46],
        O: [74, 68, 63, 69, 73]
      };
  
      // Set the center cell as a free space
      bingoCard.N[2] = 'free';
  
      return bingoCard;
    };
  
    const checkWin = () => {
      const winConditions = [
        ['B9', 'B13', 'B6', 'B11', 'B5'], // First row (B)
        ['I26', 'I18', 'I27', 'I16', 'I29'], // Second row (I)
        ['N45', 'N31', 'free', 'N42', 'N35'], // Third row (N)
        ['G47', 'G51', 'G59', 'G60', 'G46'], // Fourth row (G)
        ['O74', 'O68', 'O63', 'O69', 'O73'], // Fifth row (O)
        ['B9', 'I18', 'free', 'G60', 'O73'], // Top-left to bottom-right diagonal
        ['O74', 'G51', 'free', 'I16', 'B5'], // Top-right to bottom-left diagonal
        ['B9', 'I26', 'N45', 'G47', 'O74'], // First column
        ['B13', 'I18', 'N31', 'G51', 'O68'], // Second column
        ['B6', 'I27', 'free', 'G59', 'O63'], // Third column
        ['B11', 'I16', 'N42', 'G60', 'O69'], // Fourth column
        ['B5', 'I29', 'N35', 'G46', 'O73']  // Fifth column
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