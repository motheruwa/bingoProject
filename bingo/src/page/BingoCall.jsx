import React, { useEffect, useState } from 'react';
import styles from '../css/BingoCall.module.css';
import Bingocard from '../images/bingocard.jpg'
import { MdOutlineStarRate } from "react-icons/md";
import B1 from '../audio/B1.mp4'
import B2 from '../audio/B2.mp4'
import B3 from '../audio/B3.mp4'
import B4 from '../audio/B4.mp4'
import B5 from '../audio/B5.mp4'
import B6 from '../audio/B6.mp4'
import B7 from '../audio/B7.mp4'
import B8 from '../audio/B8.mp4'
import B9 from '../audio/B9.mp4'
import B10 from '../audio/B10.mp4'
import B11 from '../audio/B11.mp4'
import B12 from '../audio/B12.mp4'
import B13 from '../audio/B13.mp4'
import B14 from '../audio/B14.mp4'
import B15 from '../audio/B15.mp4'
import I16 from '../audio/I16.mp4'
import I17 from '../audio/I17.mp4'
import I18 from '../audio/I18.mp4'
import I19 from '../audio/I19.mp4'
import I20 from '../audio/I20.mp4'
import I21 from '../audio/I21.mp4'
import I22 from '../audio/I22.mp4'
import I23 from '../audio/I23.mp4'
import I24 from '../audio/I24.mp4'
import I25 from '../audio/I25.mp4'
import I26 from '../audio/I26.mp4'
import I27 from '../audio/I27.mp4'
import I28 from '../audio/I28.mp4'
import I29 from '../audio/I29.mp4'
import I30 from '../audio/I30.mp4'
import N31 from '../audio/N31.mp4'
import N32 from '../audio/N32.mp4'
import N33 from '../audio/N33.mp4'
import N34 from '../audio/N34.mp4'
import N35 from '../audio/N35.mp4'
import N36 from '../audio/N36.mp4'
import N37 from '../audio/N37.mp4'
import N38 from '../audio/N38.mp4'
import N39 from '../audio/N39.mp4'
import N40 from '../audio/N40.mp4'
import N41 from '../audio/N41.mp4'
import N42 from '../audio/N42.mp4'
import N43 from '../audio/N43.mp4'
import N44 from '../audio/N44.mp4'
import N45 from '../audio/N45.mp4'
import G46 from '../audio/G46.mp4'
import G47 from '../audio/G47.mp4'
import G48 from '../audio/G48.mp4'
import G49 from '../audio/G49.mp4'
import G50 from '../audio/G50.mp4'
import G51 from '../audio/G51.mp4'
import G52 from '../audio/G52.mp4'
import G53 from '../audio/G53.mp4'
import G54 from '../audio/G54.mp4'
import G55 from '../audio/G55.mp4'
import G56 from '../audio/G56.mp4'
import G57 from '../audio/G57.mp4'
import G58 from '../audio/G58.mp4'
import G59 from '../audio/G59.mp4'
import G60 from '../audio/G60.mp4'
import O61 from '../audio/O61.mp4'
import O62 from '../audio/O62.mp4'
import O63 from '../audio/O63.mp4'
import O64 from '../audio/O64.mp4'
import O65 from '../audio/O65.mp4'
import O66 from '../audio/O66.mp4'
import O67 from '../audio/O67.mp4'
import O68 from '../audio/O68.mp4'
import O69 from '../audio/O69.mp4'
import O70 from '../audio/O70.mp4'
import O71 from '../audio/O71.mp4'
import O72 from '../audio/O72.mp4'
import O73 from '../audio/O73.mp4'
import O74 from '../audio/O74.mp4'
import O75 from '../audio/O75.mp4'

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
  // Retrieve selectedName from localStorage
  const savedName = localStorage.getItem('selectedName');
  // Call the appropriate function based on the selected name
  switch (savedName) {
    case 'yabsra':
      playAudioForNumberMikiyas(currentNumber);
      break;
    case 'bereket':
      playAudioForNumberBereket(currentNumber);
      break;
    case 'Xbingo':
      playAudioForNumber(currentNumber);
      break;
    default:
      playAudioForNumber(currentNumber);
  }
}, [currentNumber]);
const playAudioForNumberBereket = (number) =>{

}
const playAudioForNumberMikiyas = (number) =>{
  
}
// eslint-disable-next-line
const YourComponent = () => {
  useEffect(() => {
      // Define a list of audio file paths
      const audioFiles = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15,
        I16, I17, I18, I19, I20, I21, I22, I23, I24, I25, I26, I27, I28, I29, I30,
        N31, N32, N33, N34, N35, N36, N37, N38, N39, N40, N41, N42, N43, N44, N45,
        G46, G47, G48, G49, G50, G51, G52, G53, G54, G55, G56, G57, G58, G59, G60,
        O61, O62, O63, O64, O65, O66, O67, O68, O69, O70, O71, O72, O73, O74, O75]; // Add imported audio files here

      // Preload all audio files when the component mounts
      audioFiles.forEach((audioFile) => {
          const audio = new Audio(audioFile);
          audio.preload = 'auto';
      });

      // Clean up function to clear preloaded audio files if the component unmounts
      return () => {
          audioFiles.forEach((audioFile) => {
              const audio = new Audio(audioFile);
              audio.preload = 'none';
          });
      };
  }, []);}
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