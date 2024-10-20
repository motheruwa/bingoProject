import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BingoCall } from './BingoCall';
import styles from '../css/RandomBingoNumber.module.css';
import notRegisteredAudio from '../audio/NOTREGISTERD.mp4'
function RandomBingoNumber() {
  const [currentNumber, setCurrentNumber] = useState('');
  const [calledNumbers, setCalledNumbers] = useState(() => {
    const cachedCalledNumbers = JSON.parse(localStorage.getItem('calledNumbers'));
    const initialCalledNumbers = new Set(cachedCalledNumbers);
    if (!initialCalledNumbers.has('free')) {
      initialCalledNumbers.add('free');
    }
    return initialCalledNumbers;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [cardNumberInput, setCardNumberInput] = useState('');
  // eslint-disable-next-line
  const [cardNumber, setCardNumber] = useState('');
  const [secondsInterval, setSecondsInterval] = useState(() => {
    const storedInterval = localStorage.getItem('secondsInterval');
    return storedInterval ? parseInt(storedInterval) : 3;
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { registeredNumbers,remainingMoney } = location.state;

  useEffect(() => {
    localStorage.setItem('secondsInterval', secondsInterval);
  }, [secondsInterval]);
  
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateNumber = (letter) => {
    switch (letter) {
      case 'B':
        return `B${generateRandomNumber(1, 15)}`;
      case 'I':
        return `I${generateRandomNumber(16, 30)}`;
      case 'N':
        return `N${generateRandomNumber(31, 45)}`;
      case 'G':
        return `G${generateRandomNumber(46, 60)}`;
      case 'O':
        return `O${generateRandomNumber(61, 75)}`;
      default:
        return '';
    }
  };

  const generateRandomBingoNumber = () => {
    const letters = ['B', 'I', 'N', 'G', 'O'];
    let newRandomNumber = '';

    if (calledNumbers.size === 76) {
      setIsPlaying(false);
      return;
    }

    do {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      newRandomNumber = generateNumber(randomLetter);
    } while (calledNumbers.has(newRandomNumber));

    setCalledNumbers(new Set(calledNumbers).add(newRandomNumber));
    setCurrentNumber(newRandomNumber);
  };

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        generateRandomBingoNumber();
      }, secondsInterval * 1000);
    }

    return () => {
      clearInterval(interval);
      localStorage.setItem('calledNumbers', JSON.stringify(Array.from(calledNumbers)));
    };
    // eslint-disable-next-line
  }, [calledNumbers, isPlaying]);

  const handlePlayStopToggle = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  

  const handleCardNumberChange = () => {
    // Check if the entered card number is found in the registeredNumbers
    if (registeredNumbers.some(number => String(number).includes(cardNumberInput))) {
      setCardNumber(cardNumberInput);
  
      // Use a switch statement to navigate to the corresponding Card component based on the card number
      switch (cardNumberInput) {
        case '1':
          navigate(`/card1?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '26':
          navigate(`/card26?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '27':
          navigate(`/card27?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
          case '46':
            navigate(`/card46?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
            break;
            case '44':
              navigate(`/card44?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
              break;
              case '38':
                navigate(`/card38?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
                break;
                case '43':
                  navigate(`/card43?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
                  break;
        case '47':
        navigate(`/card47?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break; 
        case '32':
        navigate(`/card32?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break;  
        case '36':
        navigate(`/card36?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break;
        case '33':
        navigate(`/card33?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break;  
        case '40':
        navigate(`/card40?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break;
        case '41':
        navigate(`/card41?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break;
        case '30':
        navigate(`/card30?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break; 
        case '31':
        navigate(`/card31?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break;
        case '49':
        navigate(`/card49?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break;
        case '34':
        navigate(`/card34?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break; 
        case '48':
        navigate(`/card48?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break;
        case '42':
        navigate(`/card42?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break; 
        case '39':
        navigate(`/card39?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break; 
        case '35':
        navigate(`/card35?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break; 
        case '28':
        navigate(`/card28?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break;
        case '29':
        navigate(`/card29?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break; 
        case '50':
        navigate(`/card50?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break;
        case '45':
        navigate(`/card45?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break; 
        case '37':
        navigate(`/card37?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
        break;                                                                                               
        // Add cases for more card numbers as needed
        default:
          // Do nothing if the card number is not explicitly handled
          break;
      }
    } else {
      // Play the "not registered" audio when the card number is not found in registeredNumbers
      const audio = new Audio(notRegisteredAudio);
      audio.play();
    }
  };

  return (
    <div className={styles.randombingonumber}>
      <BingoCall currentNumber={currentNumber} calledNumbers={calledNumbers} totalAmount={remainingMoney}/>

      <div className={styles.playcard}>
      <button onClick={handlePlayStopToggle} className={isPlaying ? styles.stopbutton : styles.playbutton}>
  {isPlaying ? 'Stop' : 'Play'}
</button>
<div className={styles.sliderContainer}>
<span>{secondsInterval} seconds</span>

          <input
            type="range"
            min="1"
            max="10"
            value={secondsInterval}
            onChange={(e) => setSecondsInterval(parseInt(e.target.value))}
            className={styles.slider}
            id="intervalSlider"
          />
        </div>
        <div className={styles.input}>
          <input  
            type="text"
            value={cardNumberInput}
            onChange={(e) => setCardNumberInput(e.target.value)}
            placeholder="Enter Card Number"
          />
          <button onClick={handleCardNumberChange} className={styles.check}>Check</button>
        </div>
      </div>
    </div>
  );
}

export default RandomBingoNumber;