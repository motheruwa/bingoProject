import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line
import styles from '../css/User.module.css'
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
const User = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [newPermission, setNewPermission] = useState('true');
    const [reportData, setReportData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('daily');
    const [filteredData, setFilteredData] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [playType, setPlayType] = useState('default');
    const [filteredReportData, setFilteredReportData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [balanceInput, setBalanceInput] = useState('');
    const [newBalance, setnewBalance] = useState(null);
      const navigate = useNavigate();
    
    const handleBalanceChange = (event) => {
      setBalanceInput(event.target.value);
      setnewBalance(parseFloat(event.target.value) + (user ? user.balance : 0));
  };
    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
    };
    const handlePlayTypeChange = (value) => {
      setPlayType(value);
  };
  const handlePermissionChange = (value) => {
    setNewPermission(value);
};
const updateBalance = async (userName) => {
  try {
    const response = await axios.put(`https://bin.zaahirahtravels.com/api/user/update`, { userName, newBalance });

    if (response.status === 200) {
      console.log(response.data);
      setUser(prevUser => ({ ...prevUser, balance: newBalance }));
    } else {
      console.error('Failed to update balance:', response.data.error);
      throw new Error(response.data.error);
    }
  } catch (error) {
    console.error('Error updating balance:', error.message);
    throw error;
  }
};
  const updatePlayType = async (userName) => {
    try {
        const response = await axios.put(`https://bin.zaahirahtravels.com/api/user/updateplayType`, { userName, playType });

        if (response.status === 200) {
            console.log('playType updated successfully:', response.data);
            setUser({ ...user, playType: playType }); // Update the user's permission in the local state
            return response.data;
        } else {
            console.error('Failed to update playType:', response.data.error);
            throw new Error(response.data.error);
        }
    } catch (error) {
        console.error('Error updating playType:', error.message);
        throw error;
    }
};
    useEffect(() => {
      const getReportsByUserName = async () => {
        try {
            const response = await axios.get(`https://bin.zaahirahtravels.com/api/report/${username}`);
      
            if (response.status === 200) {
                   setReportData(response.data);
                console.log(response.data);
            } else if (response.status === 404) {
                return { error: 'No reports found for this user' };
            } else {
                throw new Error('Failed to fetch reports. Status: ' + response.status);
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
            throw error;
        }
      };
    
        getReportsByUserName();
        // eslint-disable-next-line
      }, []); 

      const handleOptionChange = (option) => {
        setSelectedOption(option);
      };
    
      const filterData = () => {
        if (selectedOption === 'daily') {
          const currentDate = new Date().toISOString().slice(0, 10);
          const filtered = reportData.filter(report => new Date(report.createdAt).toISOString().slice(0, 10) === currentDate);
          setFilteredData(filtered);
        } else if (selectedOption === 'weekly') {
          const currentDate = new Date();
          const weekStart = new Date(currentDate);
          weekStart.setDate(currentDate.getDate() - 6); // Start from the current day and go back 6 days
          const filtered = reportData.filter(report => {
            const reportDate = new Date(report.createdAt);
            return reportDate.toISOString().slice(0, 10) >= weekStart.toISOString().slice(0, 10) && reportDate.toISOString().slice(0, 10) <= currentDate.toISOString().slice(0, 10);
          });
          setFilteredData(filtered);
        } else if (selectedOption === 'custom') {
          const fromDateISO = new Date(fromDate).toISOString().slice(0, 10);
          const toDateISO = new Date(toDate).toISOString().slice(0, 10);
    
          const filtered = reportData.filter(report => {
            const reportDate = new Date(report.createdAt);
            const reportDateISO = reportDate.toISOString().slice(0, 10);
            return reportDateISO >= fromDateISO && reportDateISO <= toDateISO;
          });
          setFilteredData(filtered);
        }
      };
    
      const calculateTotalDeductedAmount = () => {
        return filteredData.reduce((acc, curr) => acc + curr.deductedAmount, 0);
      };


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://bin.zaahirahtravels.com/api/user/${username}`);
                setUser(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [username]);

    const handlePermissionUpdate = async () => {
        try {
            const response = await axios.put(`https://bin.zaahirahtravels.com/api/user/`, { userName: user.userName, permission:newPermission });
            setUser({ ...user, permission: newPermission }); // Update the user's permission in the local state
            console.log(response.data);
        } catch (error) {
            console.error('Error updating permission:', error);
        }
    };

    const handleShowData = () => {
      const formattedSelectedDate = new Date(selectedDate).toISOString().slice(0, 10);
  
      // Filter the reportData array based on the selected date
      const filteredData = selectedDate
        ? reportData.filter((report) => {
            const formattedCreatedAt = new Date(report.createdAt).toISOString().slice(0, 10);
            return formattedCreatedAt === formattedSelectedDate;
          })
        : reportData;
  
      setFilteredReportData(filteredData);
  };
  const totalDeductedAmount = filteredReportData.reduce((acc, curr) => acc + curr.deductedAmount, 0);
  const handleBackClick = () => {
    navigate("/");
  };
    return (
        <div className={styles.container}>
            {user ? (
                <div>
                    <div className={styles.nav}>
                <div>{user.userName}</div>
<div className={styles.back} onClick={handleBackClick}>
<IoMdArrowRoundBack size={'2 rem'}/>
      </div>
                </div>
                    <p><b>Balance:</b> {user.balance}</p>
                    <p><b>Permission:</b> {user.permission}</p>
                    <p><b>playType:</b> {user.playType}</p>
                    <select value={newPermission} onChange={(e) => handlePermissionChange(e.target.value)} className={styles.setpermision}>
                        <option value={'true'}>True</option>
                        <option value={'false'}>False</option>
                    </select>
                    <button onClick={handlePermissionUpdate} className={styles.perbutton}>Update Permission</button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
    <div className={styles.selecttype}>
                <select value={playType} onChange={(e) => handlePlayTypeChange(e.target.value)} className={styles.setpermision}>
                    <option value="default">Default</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                </select>
                <button onClick={()=>updatePlayType(user.userName)} className={styles.perbutton}>Set playType</button>
            </div>
            <div className={styles.bala}>
                <div>
                    <input type="number" value={balanceInput} onChange={handleBalanceChange} placeholder='Enter The Balance' className={styles.balanceinput}/>
                </div>
                <button onClick={()=>updateBalance(user.userName)} className={styles.perbutton}>Fill Balance</button>
            </div>
            <div className={styles.date}>
        <input
          type="date"
          id="dateInput"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button onClick={handleShowData}>Show Data</button>
        
      </div>

      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Amount</th>
            <th>No of Players</th>
            <th>Win Amount</th>
            <th>Income</th>
          </tr>
        </thead>
        <tbody>
          {filteredReportData.map((report, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{report.selectedAmount}</td>
              <td>{report.noOfPlayer}</td>
              <td>{report.winAmount}</td>
              <td>{report.deductedAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredReportData.length > 0 && (
        <div className={styles.total}>
          <p className={styles.totalincome}>Total Income: {totalDeductedAmount}</p>
        </div>
      )}
      <div>
<div className={styles.select}>
        <select value={selectedOption} onChange={(e) => handleOptionChange(e.target.value)} className={styles.setpermision}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="custom">Custom</option>
        </select>
        {selectedOption === 'custom' && (
          <div className={styles.custom}>
            <label>From</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <label>To</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
        )}
        <button onClick={filterData} className={styles.perbutton}>Show Data</button>
      </div>
      

      <div className={styles.total}>
        <p className={styles.totalincome}>Total Income : {calculateTotalDeductedAmount()}</p>
      </div>
    </div>
        </div>
    );
};

export default User;