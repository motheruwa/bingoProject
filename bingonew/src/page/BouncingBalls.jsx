import React, { useEffect, useState } from 'react';
import styles from '../css/Bounce.module.css';

const BouncingBalls = () => {
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    const letters = ['B', 'I', 'N', 'G', 'O'];

    const colors = {
      B: 'linear-gradient(to right, rgb(6, 6, 51), rgb(0, 162, 255))',
      I: 'linear-gradient(to right, rgb(22, 1, 27), rgb(192, 42, 147)',
      N: 'linear-gradient(to right, rgb(2, 36, 15), rgb(14, 204, 147)',
      G: 'linear-gradient(to right, rgb(41, 18, 3), rgb(230, 171, 63)',
      O: 'linear-gradient(to right, rgb(22, 14, 8), rgb(163, 159, 152)'
    };

    const newBalls = letters.map((letter, index) => ({
      id: index,
      letter,
      gradientColors: colors[letter],
      animationName: `bounce${index}`,
    }));

    setBalls(newBalls);
  }, []);

  return (
    <div className={styles.container}>
      {balls.map((ball, index) => (
        <div
          key={index}
          className={styles.ball}
          style={{
            background: ball.gradientColors,
            animation: `${ball.animationName} 2s infinite`,
          }}
        >
          {ball.letter}
        </div>
      ))}
    </div>
  );
};

export default BouncingBalls;