import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BingoCall } from './BingoCall';
import styles from '../css/RandomBingoNumber.module.css';
import notRegisteredAudio from '../audio/NOTREGISTERD.mp4'
function RandomBingoNumber() {
  const [selectedName, setSelectedName] = useState(() => {
    const savedName = localStorage.getItem('selectedName');
    return savedName ? savedName : 'Xbingo';
  });
  const [playType, setPlayType] = useState(() => {
    const storedPlayType = localStorage.getItem('playType');
    return storedPlayType || 'default';
  });
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
  const registeredNumbers = JSON.parse(localStorage.getItem('registeredNumbers')) || [];
  const remainingMoney = localStorage.getItem('remainingMoney') || 0;
  // eslint-disable-next-line
  const [sequenceIndex, setSequenceIndex] = useState(() => {
    const storedIndex = localStorage.getItem('sequenceIndex');
    return storedIndex ? parseInt(storedIndex) : 0;
  });
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
// eslint-disable-next-line
  const GenerateBingoNumber1 = () => {
    const sequence = [
      'B11', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B1', 'B12', 'B13', 'B14', 'B15',
      'I16', 'I17', 'I18', 'I19', 'I20', 'I21', 'I22', 'I23', 'I24', 'I25', 'I26', 'I27', 'I28', 'I29', 'I30',
      'N31', 'N32', 'N33', 'N34', 'N35', 'N36', 'N37', 'N38', 'N39', 'N40', 'N41', 'N42', 'N43', 'N44', 'N45',
      'G46', 'G47', 'G48', 'G49', 'G50', 'G51', 'G52', 'G53', 'G54', 'G55', 'G56', 'G57', 'G58', 'G59', 'G60',
      'O61', 'O62', 'O63', 'O64', 'O65', 'O66', 'O67', 'O68', 'O69', 'O70', 'O71', 'O72', 'O73', 'O74', 'O75'
    ];
  
    let sequenceIndex = localStorage.getItem('sequenceIndex');
    if (sequenceIndex === null) {
      sequenceIndex = 0;
    } else {
      sequenceIndex = parseInt(sequenceIndex, 10);
    }
  
    do {
      const newNumber = sequence[sequenceIndex];
      if (!calledNumbers.has(newNumber) && calledNumbers.size < 76) {
        setCalledNumbers(new Set([...calledNumbers, newNumber]));
        setCurrentNumber(newNumber);
        setSequenceIndex(sequenceIndex + 1);
        localStorage.setItem('sequenceIndex', sequenceIndex + 1);
        break;
      } else {
        sequenceIndex += 1;
      }
    } while (sequenceIndex < sequence.length);
  
    if (sequenceIndex === sequence.length) {
      setIsPlaying(false);
    }
  };
  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        switch (playType) {
          case 'default':
            generateRandomBingoNumber();
            break;
          case '1':
            GenerateBingoNumber1();
            break;
          default:
            generateRandomBingoNumber();
            break;
        }
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
        case '2':
          navigate(`/card2?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '3':
          navigate(`/card3?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '4':
          navigate(`/card4?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '5':
          navigate(`/card5?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '6':
          navigate(`/card6?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '7':
          navigate(`/card7?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '8':
          navigate(`/card8?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '9':
          navigate(`/card9?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '10':
          navigate(`/card10?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '11':
          navigate(`/card11?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '12':
          navigate(`/card12?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '13':
          navigate(`/card13?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '14':
          navigate(`/card14?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '15':
          navigate(`/card15?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '16':
          navigate(`/card16?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '17':
          navigate(`/card17?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '18':
          navigate(`/card18?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '19':
          navigate(`/card19?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '20':
          navigate(`/card20?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '21':
          navigate(`/card21?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '22':
          navigate(`/card22?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '23':
          navigate(`/card23?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '24':
          navigate(`/card24?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
          break;
        case '25':
          navigate(`/card25?cardNumber=${cardNumberInput}&calledNumbers=${JSON.stringify([...calledNumbers])}`);
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

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setSelectedName(newName);
    localStorage.setItem('selectedName', newName);
  };
  return (
    <div className={styles.randombingonumber}>
      <BingoCall currentNumber={currentNumber} calledNumbers={calledNumbers} totalAmount={remainingMoney}/>

      <div className={styles.playcard}>
      <button onClick={handlePlayStopToggle} className={isPlaying ? styles.stopbutton : styles.playbutton}>
  {isPlaying ? 'Stop' : 'Play'}
</button>
<div className={styles.name}>
<select id="amount" value={selectedName} onChange={handleNameChange}>
              <option value={'bereket'}>bereket</option>
              <option value={'yabsra'}>Yabsra</option>
              <option value={'Xbingo'}>Xbingo</option>    
            </select>
</div>
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