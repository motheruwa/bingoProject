import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/Card.module.css"; // Import the CSS module for styling
import { useNavigate } from "react-router-dom";
import Win from "../audio/WIN.mp4";
import Notwin from "../audio/NOTWIN.mp4";
import WinCelebration from "./Wincelebration";
import { motion } from "framer-motion";
function Card74() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const calledNumbers = new Set(JSON.parse(params.get("calledNumbers")));
  const [showCelebration, setShowCelebration] = useState(false);
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
      B: [3, 11, 12, 14, 6],
      I: [16, 23, 21, 27, 18],
      N: [34, 36, "free", 44, 45],
      G: [56, 57, 60, 48, 50],
      O: [75, 65, 64, 68, 70],
    };

    // Set the center cell as a free space
    bingoCard.N[2] = "free";

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
      ["B3", "B11", "B12", "B14", "B6"], // First row (B)
      ["I16", "I23", "I21", "I27", "I18"], // Second row (I)
      ["N34", "N36", "free", "N44", "N45"], // Third row (N)
      ["G56", "G57", "G60", "G48", "G50"], // Fourth row (G)
      ["O75", "O65", "O64", "O68", "O70"], // Fifth row (O)
      ["B3", "I23", "free", "G48", "O70"], // Top-left to bottom-right diagonal
      ["O75", "G57", "free", "I27", "B6"], // Top-right to bottom-left diagonal
      ["B3", "I16", "N34", "G56", "O75"], // First column
      ["B11", "I23", "N36", "G57", "O65"], // Second column
      ["B12", "I21", "free", "G60", "O64"], // Third column
      ["B14", "I27", "N44", "G48", "O68"], // Fourth column
      ["B6", "I18", "N45", "G50", "O70"], // Fifth column
      ["B3", "B6", "O75", "O70"],
    ];
    const winningLines = [];
    for (const condition of winConditions) {
      if (condition.every((char) => calledNumbers.has(char))) {
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
    localStorage.removeItem("calledNumbers");
    localStorage.removeItem("registeredNumbers");
    localStorage.removeItem("sequenceIndex");

    navigate("/registerdcard");
  };

  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history stack
  };

  const audioWin = new Audio(Win);
  const audioNotwin = new Audio(Notwin);

  const playWinSound = () => {
    setShowCelebration(true);
    audioWin.play();
    setTimeout(() => setShowCelebration(false), 30000);
  };

  const playNotwinSound = () => {
    audioNotwin.play();
    audioNotwin.onended = function () {
      handleGoBack();
    };
  };

  const isFourCornersWinning =
    winningNumbers.includes("B3") &&
    winningNumbers.includes("B6") &&
    winningNumbers.includes("O75") &&
    winningNumbers.includes("O70");

  return (
    <div className={styles.container}>
      {showCelebration && <WinCelebration />}
      <div className={styles.celeb}>
        {" "}
        {showCelebration && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-[20px] z-50"
          >
            🎉 BINGO! YOU WIN! 🎉
          </motion.div>
        )}
      </div>

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
        <div className={styles.cardnumber}>Card Number 74</div>
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

export default Card74;
