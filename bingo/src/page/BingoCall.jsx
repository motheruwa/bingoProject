import React, { useEffect, useState } from 'react';
import styles from '../css/BingoCall.module.css';
import Bingocard from '../images/bingocard.jpg'
import { MdOutlineStarRate } from "react-icons/md";
import B1 from '../audio/B1.m4a'
import B2 from '../audio/B2.m4a'
import B3 from '../audio/B3.m4a'
import B4 from '../audio/B4.m4a'
import B5 from '../audio/B5.m4a'
import B6 from '../audio/B6.m4a'
import B7 from '../audio/B7.m4a'
import B8 from '../audio/B8.m4a'
import B9 from '../audio/B9.m4a'
import B10 from '../audio/B10.m4a'
import B11 from '../audio/B11.m4a'
import B12 from '../audio/B12.m4a'
import B13 from '../audio/B13.m4a'
import B14 from '../audio/B14.m4a'
import B15 from '../audio/B15.m4a'
import I16 from '../audio/I16.m4a'
import I17 from '../audio/I17.m4a'
import I18 from '../audio/I18.m4a'
import I19 from '../audio/I19.m4a'
import I20 from '../audio/I20.m4a'
import I21 from '../audio/I21.m4a'
import I22 from '../audio/I22.m4a'
import I23 from '../audio/I23.m4a'
import I24 from '../audio/I24.m4a'
import I25 from '../audio/I25.m4a'
import I26 from '../audio/I26.m4a'
import I27 from '../audio/I27.m4a'
import I28 from '../audio/I28.m4a'
import I29 from '../audio/I29.m4a'
import I30 from '../audio/I30.m4a'
import N31 from '../audio/N31.m4a'
import N32 from '../audio/N32.m4a'
import N33 from '../audio/N33.m4a'
import N34 from '../audio/N34.m4a'
import N35 from '../audio/N35.m4a'
import N36 from '../audio/N36.m4a'
import N37 from '../audio/N37.m4a'
import N38 from '../audio/N38.m4a'
import N39 from '../audio/N39.m4a'
import N40 from '../audio/N40.m4a'
import N41 from '../audio/N41.m4a'
import N42 from '../audio/N42.m4a'
import N43 from '../audio/N43.m4a'
import N44 from '../audio/N44.m4a'
import N45 from '../audio/N45.m4a'
import G46 from '../audio/G46.m4a'
import G47 from '../audio/G47.m4a'
import G48 from '../audio/G48.m4a'
import G49 from '../audio/G49.m4a'
import G50 from '../audio/G50.m4a'
import G51 from '../audio/G51.m4a'
import G52 from '../audio/G52.m4a'
import G53 from '../audio/G53.m4a'
import G54 from '../audio/G54.m4a'
import G55 from '../audio/G55.m4a'
import G56 from '../audio/G56.m4a'
import G57 from '../audio/G57.m4a'
import G58 from '../audio/G58.m4a'
import G59 from '../audio/G59.m4a'
import G60 from '../audio/G60.m4a'
import O61 from '../audio/O61.m4a'
import O62 from '../audio/O62.m4a'
import O63 from '../audio/O63.m4a'
import O64 from '../audio/O64.m4a'
import O65 from '../audio/O65.m4a'
import O66 from '../audio/O66.m4a'
import O67 from '../audio/O67.m4a'
import O68 from '../audio/O68.m4a'
import O69 from '../audio/O69.m4a'
import O70 from '../audio/O70.m4a'
import O71 from '../audio/O71.m4a'
import O72 from '../audio/O72.m4a'
import O73 from '../audio/O73.m4a'
import O74 from '../audio/O74.m4a'
import O75 from '../audio/O75.m4a'

export const BingoCall = ({ currentNumber, calledNumbers,totalAmount }) => {
  const [animateCurrent, setAnimateCurrent] = useState(false);

useEffect(() => {
setAnimateCurrent(true);


const timeout = setTimeout(() => {
  setAnimateCurrent(false);
}, 2000); // Duration of the 'current' animation

return () => clearTimeout(timeout);
}, [currentNumber]);

  useEffect(() => {
    playAudioForNumber(currentNumber); // Play audio for the current number
  }, [currentNumber]);

  const playAudioForNumber = (number) => {
    let audio;

    switch (number) {
      case 'B1':
        audio = new Audio(B1);
        break;
      case 'B2':
        audio = new Audio(B2);
        break;
      case 'B3':
        audio = new Audio(B3);
        break;
        case 'B4':
          audio = new Audio(B4);
          break;
          case 'B5':
          audio = new Audio(B5);
          break;
          case 'B6':
          audio = new Audio(B6);
          break;
          case 'B7':
          audio = new Audio(B7);
          break;
          case 'B8':
          audio = new Audio(B8);
          break;
          case 'B9':
          audio = new Audio(B9);
          break;
          case 'B10':
          audio = new Audio(B10);
          break;
          case 'B11':
          audio = new Audio(B11);
          break;
          case 'B12':
          audio = new Audio(B12);
          break;
          case 'B13':
          audio = new Audio(B13);
          break;
          case 'B14':
            audio = new Audio(B14);
            break;
            case 'B15':
            audio = new Audio(B15);
            break;
            case 'I16':
              audio = new Audio(I16);
              break;
              case 'I17':
              audio = new Audio(I17);
              break;
              case 'I18':
              audio = new Audio(I18);
              break;
              case 'I19':
              audio = new Audio(I19);
              break;
              case 'I20':
              audio = new Audio(I20);
              break;
              case 'I21':
              audio = new Audio(I21);
              break;
              case 'I22':
              audio = new Audio(I22);
              break;
              case 'I23':
              audio = new Audio(I23);
              break;
              case 'I24':
              audio = new Audio(I24);
              break;
              case 'I25':
              audio = new Audio(I25);
              break;
              case 'I26':
              audio = new Audio(I26);
              break;
              case 'I27':
              audio = new Audio(I27);
              break;
              case 'I28':
              audio = new Audio(I28);
              break;
              case 'I29':
              audio = new Audio(I29);
              break;
              case 'I30':
              audio = new Audio(I30);
              break;
              case 'N31':
              audio = new Audio(N31);
              break;
              case 'N32':
              audio = new Audio(N32);
              break;
              case 'N33':
              audio = new Audio(N33);
              break;
              case 'N34':
              audio = new Audio(N34);
              break;
              case 'N35':
              audio = new Audio(N35);
              break;
              case 'N36':
              audio = new Audio(N36);
              break;
              case 'N37':
              audio = new Audio(N37);
              break;
              case 'N38':
              audio = new Audio(N38);
              break;
              case 'N39':
              audio = new Audio(N39);
              break;
              case 'N40':
              audio = new Audio(N40);
              break;
              case 'N41':
              audio = new Audio(N41);
              break;
              case 'N42':
              audio = new Audio(N42);
              break;
              case 'N43':
              audio = new Audio(N43);
              break;
              case 'N44':
              audio = new Audio(N44);
              break;
              case 'N45':
              audio = new Audio(N45);
              break;
              case 'G46':
              audio = new Audio(G46);
              break;
              case 'G47':
              audio = new Audio(G47);
              break;
              case 'G48':
              audio = new Audio(G48);
              break;
              case 'G49':
              audio = new Audio(G49);
              break;
              case 'G50':
              audio = new Audio(G50);
              break;
              case 'G51':
              audio = new Audio(G51);
              break;
              case 'G52':
              audio = new Audio(G52);
              break;
              case 'G53':
              audio = new Audio(G53);
              break;
              case 'G54':
              audio = new Audio(G54);
              break;
              case 'G55':
              audio = new Audio(G55);
              break;
              case 'G56':
              audio = new Audio(G56);
              break;
              case 'G57':
              audio = new Audio(G57);
              break;
              case 'G58':
              audio = new Audio(G58);
              break;
              case 'G59':
              audio = new Audio(G59);
              break;
              case 'G60':
              audio = new Audio(G60);
              break;
              case 'O61':
              audio = new Audio(O61);
              break;
              case 'O62':
              audio = new Audio(O62);
              break;
              case 'O63':
              audio = new Audio(O63);
              break;
              case 'O64':
              audio = new Audio(O64);
              break;
              case 'O65':
              audio = new Audio(O65);
              break;
              case 'O66':
              audio = new Audio(O66);
              break;
              case 'O67':
              audio = new Audio(O67);
              break;
              case 'O68':
              audio = new Audio(O68);
              break;
              case 'O69':
              audio = new Audio(O69);
              break;
              case 'O70':
              audio = new Audio(O70);
              break;
              case 'O71':
              audio = new Audio(O71);
              break;
              case 'O72':
              audio = new Audio(O72);
              break;
              case 'O73':
              audio = new Audio(O73);
              break;
              case 'O74':
              audio = new Audio(O74);
              break;
              case 'O75':
              audio = new Audio(O75);
              break;
      default:
        // Handle cases where no audio needs to be played
        break;
    }

    if (audio) {
      audio.play();
  
      // Pause the audio after 3 seconds
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }, 3000); // Duration of 3 seconds
    }
  };

  const allPossibilities = [
    ...generatePossibilities('B', 1, 15),
    ...generatePossibilities('I', 16, 30),
    ...generatePossibilities('N', 31, 45),
    ...generatePossibilities('G', 46, 60),
    ...generatePossibilities('O', 61, 75)
  ];

  function generatePossibilities(letter, start, end) {
    const possibilities = [];
    for (let i = start; i <= end; i++) {
      possibilities.push(`${letter}${i}`);
    }
    return possibilities;
  }

  const rows = {
    B: allPossibilities.slice(0, 15),
    I: allPossibilities.slice(15, 30),
    N: allPossibilities.slice(30, 45),
    G: allPossibilities.slice(45, 60),
    O: allPossibilities.slice(60, 75),
  };

  // Get the five most recent called numbers
  const recentCalledNumbers = Array.from(calledNumbers).slice(-5);



  return (
    <div className={styles.bingocall}>
      <div className={styles.currentrecent}>
        <div className={styles.current11}>
          <div className={`${styles.current} ${animateCurrent ? styles.animated : ''}`}>
            <h3>{currentNumber}</h3>
          </div>
        </div>
      
      <div className={styles.img}>
        <img src={Bingocard} alt="Well Bingo"/>
      </div>
      {/* Display the five most recently called numbers */}
      <div className={styles.recentCalledNumbers}>
  <h4>Recent 5 Numbers:</h4>
  <ul >
    {recentCalledNumbers.reverse().map((number) => (
      <li key={number} className={styles.recentNumber}>
        
        {number.startsWith('free') ? <MdOutlineStarRate size={'3rem'}/> : number} {/* Remove "free" if it exists */}
      </li>
    ))}
  </ul>
</div>
      <div className={styles.derash}>
        <div className={styles.de}>ደራሽ</div>
        <div>{totalAmount}</div>
        <div>ብር</div>
      </div>
      </div>
      

      <div className={styles.bingoBoardcontainer}>
        <div className={styles.bingoBoard}>
          {Object.entries(rows).map(([letter, numbers]) => (
            <div key={letter} className={styles.bingoRow}>
               <h4 className={`${styles.letter} ${styles[letter]}`}>{letter}</h4>
              <ul className={styles.ul}>
                {numbers.map((number) => {
                  const numWithoutLetter = number.slice(1); // Remove the first character (letter)
                  return (
                    <li key={number} className={calledNumbers.has(number) ? (number === currentNumber ? `${styles.called} ${styles.animated}` : styles.called) : styles.uncalled}>
  {numWithoutLetter}
</li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};