import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/Card.module.css"; // Import the CSS module for styling
import { useNavigate } from "react-router-dom";
import Win from "../audio/WIN.mp4";
import Notwin from "../audio/NOTWIN.mp4";
import WinCelebration from "./Wincelebration";
import { motion } from "framer-motion";
function Card98() {
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
      B: [6, 1, 12, 14, 10],
      I: [16, 21, 22, 24, 30],
      N: [36, 41, "free", 44, 40],
      G: [46, 51, 52, 54, 60],
      O: [66, 71, 62, 74, 73],
    };

    // Set the center cell as a free space
    bingoCard.N[2] = "free";

    return bingoCard;
  };

  const checkWin = () => {
    const winConditions = [
        ["B6", "I16", "N36", "G46", "O66"],
  ["B1", "I21", "N41", "G51", "O71"],
  ["B12", "I22", "free", "G52", "O62"],
  ["B14", "I24", "N44", "G54", "O74"],
  ["B10", "I30", "N40", "G60", "O73"],
  ["B6", "B1", "B12", "B14", "B10"],
  ["I16", "I21", "I22", "I24", "I30"],
  ["N36", "N41", "free", "N44", "N40"],
  ["G46", "G51", "G52", "G54", "G60"],
  ["O66", "O71", "O62", "O74", "O73"],
  ["B6", "I21", "free", "G54", "O73"],
  ["B10", "I24", "free", "G51", "O66"],
  ["B6", "B10", "O66", "O73"],
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
    winningNumbers.includes("B6") &&
    winningNumbers.includes("B10") &&
    winningNumbers.includes("O66") &&
    winningNumbers.includes("O73");

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
        <div className={styles.cardnumber}>Card Number 98</div>
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

export default Card98;
