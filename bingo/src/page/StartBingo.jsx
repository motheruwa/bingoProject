import React, { useState, useEffect } from 'react';
import styles from '../css/start.module.css';
import { useNavigate } from 'react-router-dom';
import BingoCard from '../images/bingocard.jpg';
import startAudio from '../audio/START.mp4';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios'
import { supabase } from '../store/Supabase'
import { useLogout } from '../hooks/useLogout';


const StartBingo = () => {
  const { logout } = useLogout();
  const [registeredNumbers, setRegisteredNumbers] = useState([]);
  const [fetchedUser, setFetchedUser] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [round, setRound] = useState(1);
  const [remainingMoney, setRemainingMoney] = useState(0);
  // eslint-disable-next-line
  const [deductedAmount, setDeductedAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userName, setUserName] = useState('');
  const [creatingReport, setCreatingReport] = useState(false);
  const navigate = useNavigate();
  const {user} = useAuthContext()

  const handleLogOut = () => {
    logout();
    navigate('/login');
  };
  const fetchUserByUsername = async (userName) => {
    try {
      const response = await axios.get(`https://bingoproject-3.onrender.com/api/user/${userName}`);
      console.log('Fetched user by username:', response.data);
      setFetchedUser(response.data)
      // Handle the fetched user data as needed
    } catch (error) {
      console.error('Error fetching user by username:', error);
      // Handle errors
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      fetchUserByUsername(user.userName);
    }
  }, [user]);
  
  useEffect(() => {
    const storedNumbers = localStorage.getItem('registeredNumbers');
    const storedAmount = localStorage.getItem('selectedAmount');
    const round = localStorage.getItem('roundsPlayed');

    if (storedNumbers) {
      setRegisteredNumbers(JSON.parse(storedNumbers));
    }
    if (round) {
      setRound(Number(round));
    }
    if (storedAmount) {
      setSelectedAmount(Number(storedAmount));
    }
    setUserName(user.userName);

    resetRoundCountIfNewDay();
// eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Calculate the total amount
    const total = registeredNumbers.length * selectedAmount;
    setTotalAmount(total);
  
  
    // Update deduction multiplier based on the range of registered numbers
    if (selectedAmount === 10 && registeredNumbers.length <= 7) {
      setDeductedAmount(selectedAmount);
    }else if(selectedAmount === 10  && registeredNumbers.length >= 8 &&registeredNumbers.length <= 10){
      setDeductedAmount(20);
    }else if(selectedAmount === 10  && registeredNumbers.length >= 11 &&registeredNumbers.length <= 17){
      setDeductedAmount(30);
    }else if(selectedAmount === 10  && registeredNumbers.length >= 18 &&registeredNumbers.length <= 22){
      setDeductedAmount(40);
    }else if(selectedAmount === 10  && registeredNumbers.length >= 23 &&registeredNumbers.length <= 27){
      setDeductedAmount(50);
    }else if(selectedAmount === 10  && registeredNumbers.length >= 28 &&registeredNumbers.length <= 31){
      setDeductedAmount(60);
    }else if(selectedAmount === 10  && registeredNumbers.length >= 32 &&registeredNumbers.length <= 35){
      setDeductedAmount(70);
    }else if(selectedAmount === 10  && registeredNumbers.length >= 36 &&registeredNumbers.length <= 38){
      setDeductedAmount(80);
    }else if(selectedAmount === 10  && registeredNumbers.length >= 39 &&registeredNumbers.length <= 41){
      setDeductedAmount(90);
    }else if(selectedAmount === 10  && registeredNumbers.length >= 42 &&registeredNumbers.length <= 45){
      setDeductedAmount(100);
    }else if(selectedAmount === 10  && registeredNumbers.length >= 46 &&registeredNumbers.length <= 50){
      setDeductedAmount(110);
    }else if(selectedAmount === 20  && registeredNumbers.length <= 6){
      setDeductedAmount(20);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 7 &&registeredNumbers.length <= 8){
      setDeductedAmount(30);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 9 &&registeredNumbers.length <= 11){
      setDeductedAmount(40);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 12 &&registeredNumbers.length <= 13){
      setDeductedAmount(50);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 14 &&registeredNumbers.length <= 15){
      setDeductedAmount(60);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 16 &&registeredNumbers.length <= 17){
      setDeductedAmount(70);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 18 &&registeredNumbers.length <= 19){
      setDeductedAmount(80);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 20 &&registeredNumbers.length <= 21){
      setDeductedAmount(90);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 22 &&registeredNumbers.length <= 23){
      setDeductedAmount(100);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 24 &&registeredNumbers.length <= 25){
      setDeductedAmount(110);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 26 &&registeredNumbers.length <= 27){
      setDeductedAmount(120);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 28 &&registeredNumbers.length <= 29){
      setDeductedAmount(130);
    }else if(selectedAmount === 20  && registeredNumbers.length >=30 &&registeredNumbers.length <= 31){
      setDeductedAmount(140);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 32 &&registeredNumbers.length <= 33){
      setDeductedAmount(150);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 34 &&registeredNumbers.length <= 35){
      setDeductedAmount(160);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 36 &&registeredNumbers.length <= 37){
      setDeductedAmount(170);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 38 &&registeredNumbers.length <= 39){
      setDeductedAmount(180);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 40 &&registeredNumbers.length <= 41){
      setDeductedAmount(190);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 42 &&registeredNumbers.length <= 43){
      setDeductedAmount(200);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 44 &&registeredNumbers.length <= 45){
      setDeductedAmount(210);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 46 &&registeredNumbers.length <= 47){
      setDeductedAmount(220);
    }else if(selectedAmount === 20  && registeredNumbers.length >= 48 &&registeredNumbers.length <= 50){
      setDeductedAmount(230);
    }else if(selectedAmount === 30  && registeredNumbers.length <= 5 ){
      setDeductedAmount(30);
    }else if(selectedAmount === 30  && registeredNumbers.length >= 6 &&registeredNumbers.length <= 7){
      setDeductedAmount(40);
    }else if(selectedAmount === 30  && registeredNumbers.length >= 8 &&registeredNumbers.length <= 9){
      setDeductedAmount(50);
    }else if(selectedAmount === 30  && registeredNumbers.length === 10){
      setDeductedAmount(60);
    }else if(selectedAmount === 30  && registeredNumbers.length === 11){
      setDeductedAmount(70);
    }else if(selectedAmount === 30  && registeredNumbers.length === 12){
      setDeductedAmount(80);
    }else if(selectedAmount === 30  && registeredNumbers.length === 13){
      setDeductedAmount(90);
    }else if(selectedAmount === 30  && registeredNumbers.length === 14){
      setDeductedAmount(100);
    }else if(selectedAmount === 30  && registeredNumbers.length === 15){
      setDeductedAmount(110);
    }else if(selectedAmount === 30  && registeredNumbers.length === 16){
      setDeductedAmount(120);
    }else if(selectedAmount === 30  && registeredNumbers.length === 17){
      setDeductedAmount(130);
    }else if(selectedAmount === 30  && registeredNumbers.length === 18){
      setDeductedAmount(140);
    }else if(selectedAmount === 30  && registeredNumbers.length === 19){
      setDeductedAmount(150);
    }else if(selectedAmount === 30  && registeredNumbers.length === 20){
      setDeductedAmount(160);
    }else if(selectedAmount === 30  && registeredNumbers.length === 21){
      setDeductedAmount(170);
    }else if(selectedAmount === 30  && registeredNumbers.length === 22){
      setDeductedAmount(180);
    }else if(selectedAmount === 30  && registeredNumbers.length === 23){
      setDeductedAmount(190);
    }else if(selectedAmount === 30  && registeredNumbers.length === 24){
      setDeductedAmount(200);
    }else if(selectedAmount === 30  && registeredNumbers.length === 25){
      setDeductedAmount(210);
    }else if(selectedAmount === 30  && registeredNumbers.length === 26){
      setDeductedAmount(220);
    }else if(selectedAmount === 30  && registeredNumbers.length === 27){
      setDeductedAmount(230);
    }else if(selectedAmount === 30  && registeredNumbers.length === 28){
      setDeductedAmount(240);
    }else if(selectedAmount === 30  && registeredNumbers.length === 29){
      setDeductedAmount(250);
    }else if(selectedAmount === 30  && registeredNumbers.length === 30){
      setDeductedAmount(260);
    }else if(selectedAmount === 30  && registeredNumbers.length === 31){
      setDeductedAmount(270);
    }else if(selectedAmount === 30  && registeredNumbers.length === 32){
      setDeductedAmount(280);
    }else if(selectedAmount === 30  && registeredNumbers.length === 33){
      setDeductedAmount(290);
    }else if(selectedAmount === 30  && registeredNumbers.length === 34){
      setDeductedAmount(300);
    }else if(selectedAmount === 30  && registeredNumbers.length === 35){
      setDeductedAmount(310);
    }else if(selectedAmount === 30  && registeredNumbers.length === 36){
      setDeductedAmount(320);
    }else if(selectedAmount === 30  && registeredNumbers.length === 37){
      setDeductedAmount(330);
    }else if(selectedAmount === 30  && registeredNumbers.length === 38){
      setDeductedAmount(340);
    }else if(selectedAmount === 30  && registeredNumbers.length === 39){
      setDeductedAmount(350);
    }else if(selectedAmount === 30  && registeredNumbers.length === 40){
      setDeductedAmount(360);
    }else if(selectedAmount === 30  && registeredNumbers.length === 41){
      setDeductedAmount(370);
    }else if(selectedAmount === 30  && registeredNumbers.length === 42){
      setDeductedAmount(380);
    }else if(selectedAmount === 30  && registeredNumbers.length === 43){
      setDeductedAmount(390);
    }else if(selectedAmount === 30  && registeredNumbers.length === 44){
      setDeductedAmount(400);
    }else if(selectedAmount === 30  && registeredNumbers.length === 45){
      setDeductedAmount(410);
    }else if(selectedAmount === 30  && registeredNumbers.length === 46){
      setDeductedAmount(420);
    }else if(selectedAmount === 30  && registeredNumbers.length === 47){
      setDeductedAmount(430);
    }else if(selectedAmount === 30  && registeredNumbers.length === 48){
      setDeductedAmount(440);
    }else if(selectedAmount === 30  && registeredNumbers.length === 49){
      setDeductedAmount(450);
    }else if(selectedAmount === 30  && registeredNumbers.length === 50){
      setDeductedAmount(460);
    }else if(selectedAmount === 40  && registeredNumbers.length <= 5){
      setDeductedAmount(40);
    }else if(selectedAmount === 40  && registeredNumbers.length === 6){
      setDeductedAmount(50);
    }else if(selectedAmount === 40  && registeredNumbers.length === 7){
      setDeductedAmount(60);
    }else if(selectedAmount === 40  && registeredNumbers.length === 8){
      setDeductedAmount(70);
    }else if (selectedAmount === 40  &&registeredNumbers.length === 9) {
      setDeductedAmount(80);
  } else if (selectedAmount === 40  &&registeredNumbers.length === 10) {
      setDeductedAmount(90);
  } else if (selectedAmount === 40  &&registeredNumbers.length === 11) {
      setDeductedAmount(100);
  } else if (selectedAmount === 40  &&registeredNumbers.length === 12) {
      setDeductedAmount(110);
  } else if (selectedAmount === 40  &&registeredNumbers.length === 13) {
      setDeductedAmount(120);
  } else if (selectedAmount === 40  &&registeredNumbers.length === 14) {
      setDeductedAmount(130);
  } else if (selectedAmount === 40  &&registeredNumbers.length === 15) {
      setDeductedAmount(140);
  } else if (selectedAmount === 40  &&registeredNumbers.length === 16) {
      setDeductedAmount(150);
  } else if (selectedAmount === 40  &&registeredNumbers.length === 17) {
      setDeductedAmount(160);
  } else if (selectedAmount === 40  &&registeredNumbers.length === 18) {
      setDeductedAmount(170);
  } else if (selectedAmount === 40  &&registeredNumbers.length === 19) {
      setDeductedAmount(180);
  } else if (selectedAmount === 40  &&registeredNumbers.length === 20) {
      setDeductedAmount(190);
  }else if(selectedAmount === 40  &&registeredNumbers.length === 21) {
    setDeductedAmount(200);
} else if (selectedAmount === 40  &&registeredNumbers.length === 22) {
    setDeductedAmount(210);
} else if (selectedAmount === 40  &&registeredNumbers.length === 23) {
    setDeductedAmount(220);
} else if (selectedAmount === 40  &&registeredNumbers.length === 24) {
    setDeductedAmount(230);
} else if (selectedAmount === 40  &&registeredNumbers.length === 25) {
    setDeductedAmount(240);
} else if (selectedAmount === 40  &&registeredNumbers.length === 26) {
    setDeductedAmount(250);
} else if (selectedAmount === 40  &&registeredNumbers.length === 27) {
    setDeductedAmount(260);
} else if (selectedAmount === 40  &&registeredNumbers.length === 28) {
    setDeductedAmount(270);
} else if (selectedAmount === 40  &&registeredNumbers.length === 29) {
    setDeductedAmount(280);
} else if (selectedAmount === 40  &&registeredNumbers.length === 30) {
    setDeductedAmount(290);
}else  if (selectedAmount === 40  &&registeredNumbers.length === 31) {
  setDeductedAmount(300);
} else if (selectedAmount === 40  &&registeredNumbers.length === 32) {
  setDeductedAmount(310);
} else if (selectedAmount === 40  &&registeredNumbers.length === 33) {
  setDeductedAmount(320);
} else if (selectedAmount === 40  &&registeredNumbers.length === 34) {
  setDeductedAmount(330);
} else if (selectedAmount === 40  &&registeredNumbers.length === 35) {
  setDeductedAmount(340);
} else if (selectedAmount === 40  &&registeredNumbers.length === 36) {
  setDeductedAmount(350);
} else if (selectedAmount === 40  &&registeredNumbers.length === 37) {
  setDeductedAmount(360);
} else if (selectedAmount === 40  &&registeredNumbers.length === 38) {
  setDeductedAmount(370);
} else if (selectedAmount === 40  &&registeredNumbers.length === 39) {
  setDeductedAmount(380);
} else if (selectedAmount === 40  &&registeredNumbers.length === 40) {
  setDeductedAmount(390);
}else if (selectedAmount === 40  &&registeredNumbers.length === 41) {
  setDeductedAmount(400);
} else if (selectedAmount === 40  &&registeredNumbers.length === 42) {
  setDeductedAmount(410);
} else if (selectedAmount === 40  &&registeredNumbers.length === 43) {
  setDeductedAmount(420);
} else if (selectedAmount === 40  &&registeredNumbers.length === 44) {
  setDeductedAmount(430);
} else if (selectedAmount === 40  &&registeredNumbers.length === 45) {
  setDeductedAmount(440);
} else if (selectedAmount === 40  &&registeredNumbers.length === 46) {
  setDeductedAmount(450);
} else if (selectedAmount === 40  &&registeredNumbers.length === 47) {
  setDeductedAmount(460);
} else if (selectedAmount === 40  &&registeredNumbers.length === 48) {
  setDeductedAmount(470);
} else if (selectedAmount === 40  &&registeredNumbers.length === 49) {
  setDeductedAmount(480);
} else if (selectedAmount === 40  &&registeredNumbers.length === 50) {
  setDeductedAmount(490);
}else if (selectedAmount === 50  &&registeredNumbers.length <= 5) {
  setDeductedAmount(50);
}else if (selectedAmount === 50  &&registeredNumbers.length === 6) {
  setDeductedAmount(60);
}else if (selectedAmount === 50  &&registeredNumbers.length === 7) {
  setDeductedAmount(80);
}else if (selectedAmount === 50  &&registeredNumbers.length === 8) {
  setDeductedAmount(90);
}else if (selectedAmount === 50  &&registeredNumbers.length === 9) {
  setDeductedAmount(100);
}else if (selectedAmount === 50  &&registeredNumbers.length === 10) {
  setDeductedAmount(110);
}else if (selectedAmount === 50  &&registeredNumbers.length === 11) {
  setDeductedAmount(120);
} else if (selectedAmount === 50  &&registeredNumbers.length === 12) {
  setDeductedAmount(130);
} else if (selectedAmount === 50  &&registeredNumbers.length === 13) {
  setDeductedAmount(140);
} else if (selectedAmount === 50  &&registeredNumbers.length === 14) {
  setDeductedAmount(150);
} else if (selectedAmount === 50  &&registeredNumbers.length === 15) {
  setDeductedAmount(160);
} else if (selectedAmount === 50  &&registeredNumbers.length === 16) {
  setDeductedAmount(200);
} else if (selectedAmount === 50  &&registeredNumbers.length === 17) {
  setDeductedAmount(210);
} else if (selectedAmount === 50  &&registeredNumbers.length === 18) {
  setDeductedAmount(220);
} else if (selectedAmount === 50  &&registeredNumbers.length === 19) {
  setDeductedAmount(250);
} else if (selectedAmount === 50  &&registeredNumbers.length === 20) {
  setDeductedAmount(300);
} else if (selectedAmount === 50  &&registeredNumbers.length === 21) {
  setDeductedAmount(310);
} else if (selectedAmount === 50  &&registeredNumbers.length === 22) {
  setDeductedAmount(320);
} else if (selectedAmount === 50  &&registeredNumbers.length === 23) {
  setDeductedAmount(350);
} else if (selectedAmount === 50  &&registeredNumbers.length === 24) {
  setDeductedAmount(360);
} else if (selectedAmount === 50  &&registeredNumbers.length === 25) {
  setDeductedAmount(380);
} else if (selectedAmount === 50  &&registeredNumbers.length === 26) {
  setDeductedAmount(400);
} else if (selectedAmount === 50  &&registeredNumbers.length === 27) {
  setDeductedAmount(420);
} else if (selectedAmount === 50  &&registeredNumbers.length === 28) {
  setDeductedAmount(450);
} else if (selectedAmount === 50  &&registeredNumbers.length === 29) {
  setDeductedAmount(460);
}else if (selectedAmount === 50  &&registeredNumbers.length === 30) {
  setDeductedAmount(470);
}else if (selectedAmount === 50  &&registeredNumbers.length === 31) {
  setDeductedAmount(480);
}else if (selectedAmount === 50  &&registeredNumbers.length === 32) {
  setDeductedAmount(490);
}else if (selectedAmount === 50  &&registeredNumbers.length === 33) {
  setDeductedAmount(500);
}else if (selectedAmount === 50  &&registeredNumbers.length === 34) {
  setDeductedAmount(510);
}else if (selectedAmount === 50  &&registeredNumbers.length === 35) {
  setDeductedAmount(520);
}else if (selectedAmount === 50  &&registeredNumbers.length === 36) {
  setDeductedAmount(530);
}else if (selectedAmount === 50  &&registeredNumbers.length === 37) {
  setDeductedAmount(540);
}else if (selectedAmount === 50  &&registeredNumbers.length === 38) {
  setDeductedAmount(550);
}else if (selectedAmount === 50  &&registeredNumbers.length === 39) {
  setDeductedAmount(560);
}else if (selectedAmount === 50  &&registeredNumbers.length === 40) {
  setDeductedAmount(570);
}else if (selectedAmount === 50  &&registeredNumbers.length === 41) {
  setDeductedAmount(600);
}else if (selectedAmount === 50  &&registeredNumbers.length === 42) {
  setDeductedAmount(630);
}else if (selectedAmount === 50  &&registeredNumbers.length === 43) {
  setDeductedAmount(650);
}else if (selectedAmount === 50  &&registeredNumbers.length === 44) {
  setDeductedAmount(660);
}else if (selectedAmount === 50  &&registeredNumbers.length === 45) {
  setDeductedAmount(670);
}else if (selectedAmount === 50  &&registeredNumbers.length === 46) {
  setDeductedAmount(680);
}else if (selectedAmount === 50  &&registeredNumbers.length === 47) {
  setDeductedAmount(690);
}else if (selectedAmount === 50  &&registeredNumbers.length === 48) {
  setDeductedAmount(700);
}else if (selectedAmount === 50  &&registeredNumbers.length === 49) {
  setDeductedAmount(750);
}else if (selectedAmount === 50  &&registeredNumbers.length === 50) {
  setDeductedAmount(760);
}else if (selectedAmount === 100  &&registeredNumbers.length <= 5) {
  setDeductedAmount(100);
}else if (selectedAmount === 100  &&registeredNumbers.length === 6) {
  setDeductedAmount(130);
}else if (selectedAmount === 100  &&registeredNumbers.length === 7) {
  setDeductedAmount(150);
}else if (selectedAmount === 100  &&registeredNumbers.length === 8) {
  setDeductedAmount(200);
}else if (selectedAmount === 100  &&registeredNumbers.length === 9) {
  setDeductedAmount(250);
}else if (selectedAmount === 100  &&registeredNumbers.length === 10) {
  setDeductedAmount(300);
}else if (selectedAmount === 100  &&registeredNumbers.length === 11) {
  setDeductedAmount(330);
}else if (selectedAmount === 100  &&registeredNumbers.length === 12) {
  setDeductedAmount(360);
}else if (selectedAmount === 100  &&registeredNumbers.length === 13) {
  setDeductedAmount(390);
}else if (selectedAmount === 100  &&registeredNumbers.length === 14) {
  setDeductedAmount(420);
}else if (selectedAmount === 100  &&registeredNumbers.length === 15) {
  setDeductedAmount(460);
}else if (selectedAmount === 100  &&registeredNumbers.length === 16) {
  setDeductedAmount(490);
}else if (selectedAmount === 100  &&registeredNumbers.length === 17) {
  setDeductedAmount(520);
}else if (selectedAmount === 100  &&registeredNumbers.length === 18) {
  setDeductedAmount(550);
}else if (selectedAmount === 100  &&registeredNumbers.length === 19) {
  setDeductedAmount(570);
}else if (selectedAmount === 100  &&registeredNumbers.length === 20) {
  setDeductedAmount(600);
}else if (selectedAmount === 100  &&registeredNumbers.length === 21) {
  setDeductedAmount(630);
}else if (selectedAmount === 100  &&registeredNumbers.length === 22) {
  setDeductedAmount(660);
}else if (selectedAmount === 100  &&registeredNumbers.length === 23) {
  setDeductedAmount(690);
}else if (selectedAmount === 100  &&registeredNumbers.length === 24) {
  setDeductedAmount(720);
}else if (selectedAmount === 100  &&registeredNumbers.length === 25) {
  setDeductedAmount(750);
}else if (selectedAmount === 100  &&registeredNumbers.length === 26) {
  setDeductedAmount(780);
}else if (selectedAmount === 100  &&registeredNumbers.length === 27) {
  setDeductedAmount(810);
}else if (selectedAmount === 100  &&registeredNumbers.length === 28) {
  setDeductedAmount(840);
}else if (selectedAmount === 100  &&registeredNumbers.length === 29) {
  setDeductedAmount(870);
}else if (selectedAmount === 100  &&registeredNumbers.length === 30) {
  setDeductedAmount(900);
}

    // Calculate the remaining money after deduction
    const remaining = totalAmount - deductedAmount;
    setRemainingMoney(remaining);
    // eslint-disable-next-line
  }, [registeredNumbers, selectedAmount, totalAmount]);
  useEffect(() => {
    const audio = new Audio(startAudio);
    audio.load(); // Preload the audio

    return () => {
      // Clean up the audio element
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    };
    // eslint-disable-next-line
  }, []); // Empty dependency array to run only on mount

  const handleClick = async () => {
    try {
      console.log(userName)
      setCreatingReport(true);
      const newBalance = fetchedUser.balance - deductedAmount;
    
      // Update the user's balance using Axios PUT request
      const response = await axios.put(`https://bingoproject-3.onrender.com/api/user/update`, { userName, newBalance });
      
      console.log('Balance updated successfully:', response.data);
      localStorage.setItem('remainingMoney', remainingMoney);
      await createReport();
    } catch (error) {
      console.error('Report creation failed:', error);
      // Handle the error, e.g., show a message to the user
    }
    finally {
      setCreatingReport(false);
    }
  };

  const handleregisterClick = () => {
    navigate('/registerdcard');
  };
  const handleReportClick = () => {
    navigate('/report');
  };
  const resetRoundCountIfNewDay = () => {
    const lastResetDate = localStorage.getItem('lastResetDate');
    const currentDate = new Date().toLocaleDateString();

    if (lastResetDate !== currentDate) {
      localStorage.setItem('roundsPlayed', '1');
      localStorage.setItem('lastResetDate', currentDate);
    }
  };

  const createReport = async () => {
    try {
      const { data, error } = await supabase.from('report').insert([
        {
          round: round,
          selectedAmount: selectedAmount,
          deductedAmount: deductedAmount,
          userName: userName,
          winAmount: remainingMoney,
          noOfPlayer: registeredNumbers.length
        }
      ]);
  
      if (error) {
        console.error('Supabase error:', error.message);
        throw error;
      }

      console.log('Report created successfully:', data);
      const audio = new Audio(startAudio);
      audio.onended = () => {
        const roundsPlayed = JSON.parse(localStorage.getItem('roundsPlayed')) || 0;
        localStorage.setItem('roundsPlayed', roundsPlayed + 1);

        navigate('/randombingonumber');
      };

      audio.play();
      // Handle the response as needed
    } catch (error) {
      console.error('Error creating report:', error);
      // Handle errors
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.link}>
        <div onClickCapture={handleregisterClick}>RegisterCard</div>
        <div onClickCapture={handleReportClick}>Report</div>
        <div onClick={handleLogOut}>Logout</div>
        </div>
      <div className={styles.card}>
        <img src={BingoCard} alt="Bingo Card" />
      </div>
      <button onClick={handleClick} disabled={registeredNumbers.length === 0 || creatingReport} className={styles.button}>
        Start
      </button>
    </div>
  );
};

export default StartBingo;