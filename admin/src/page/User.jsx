import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line
import { supabase } from '../store/Supabase';
// eslint-disable-next-line
import { supabase1 } from '../store/Supabase1';
// eslint-disable-next-line
import { supabase2 } from '../store/Supabase2';
// eslint-disable-next-line
import { supabase3 } from '../store/Supabase3';
// eslint-disable-next-line
import { supabase4 } from '../store/Supabase4';
import { supabase5 } from '../store/Supabase5';
import styles from '../css/User.module.css'
const User = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [newPermission, setNewPermission] = useState();
    const [reportData, setReportData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('daily');
    const [filteredData, setFilteredData] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [playType, setPlayType] = useState('default');

    const handlePlayTypeChange = (value) => {
      setPlayType(value);
  };

  const handleCreateOrUpdate = async () => {
    try {
      // eslint-disable-next-line
        const { data, error } = await supabase5
            .from('algorithm')
            .insert([{ userName: user.userName, playType }]);
        
        if (error) {
            throw error;
        }

        console.log('succesfuly created');
    } catch (error) {
        console.error('Error creating in algorithm table:', error.message);
    }
};
const handleUpdate = async () => {
  try {
    const { data, error } = await supabase5
      .from('algorithm')
      .update({ playType })
      .eq('userName', user.userName);

    if (error) {
      throw error;
    }

    console.log('Successfully updated');

    if (data) {
      alert('Successfully updated');
    }

  } catch (error) {
    console.error('Error updating in algorithm table:', error.message);
  }
};
    useEffect(() => {
        const fetchReportData = async () => {
          if (user && user.userName) { // Check if user and userName are not null
            try {
              const { data, error } = await (user.userName === 'abebe' ? supabase3 : user.userName === 'dagi bingo' ? supabase5 : null)
                .from('report')
                .select()
                .eq('userName', user.userName);
    
              if (error) {
                throw error;
              }
    
              setReportData(data);
            } catch (error) {
              console.error('Error fetching report data:', error.message);
            }
          }
        };
    
        fetchReportData();
      }, [user]); 

      const handleOptionChange = (option) => {
        setSelectedOption(option);
      };
    
      const filterData = () => {
        if (selectedOption === 'daily') {
          const currentDate = new Date().toISOString().slice(0, 10);
    const filtered = reportData.filter(report => new Date(report.created_at).toISOString().slice(0, 10) === currentDate);
    setFilteredData(filtered);
        } else if (selectedOption === 'weekly') {
          const currentDate = new Date();
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - 6); // Start from the current day and go back 6 days
      const filtered = reportData.filter(report => {
        const reportDate = new Date(report.created_at);
        return reportDate.toISOString().slice(0, 10) >= weekStart.toISOString().slice(0, 10) && reportDate.toISOString().slice(0, 10) <= currentDate.toISOString().slice(0, 10);
      });
      setFilteredData(filtered);
        } else if (selectedOption === 'custom') {
          const fromDateISO = new Date(fromDate).toISOString().slice(0, 10);
          const toDateISO = new Date(toDate).toISOString().slice(0, 10);
      
          const filtered = reportData.filter(report => {
            const reportDate = new Date(report.created_at);
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
                const response = await axios.get(`http://localhost:4000/api/user/${username}`);
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
            const response = await axios.put(`http://localhost:4000/api/user/`, { userName: user.userName, permission:newPermission });
            setUser({ ...user, permission: newPermission }); // Update the user's permission in the local state
            console.log(response.data);
        } catch (error) {
            console.error('Error updating permission:', error);
        }
    };

    return (
        <div>
            <p>{username}</p>
            {user ? (
                <div>
                    <h1>User Details</h1>
                    <p>Username: {user.userName}</p>
                    <p>Balance: {user.balance}</p>
                    <p>Permission: {user.permission}</p>
                    <select
                        value={newPermission}
                        onChange={(e) => setNewPermission(e.target.value)}
                    >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                    <button onClick={handlePermissionUpdate}>Update Permission</button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
<div>
<div className={styles.select}>
        <select value={selectedOption} onChange={(e) => handleOptionChange(e.target.value)} className={styles.selectoption}>
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
        <button onClick={filterData}>Show Data</button>
      </div>
      

      <div className={styles.total}>
        <p className={styles.totalincome}>Total Income : {calculateTotalDeductedAmount()}</p>
      </div>
    </div>

    <div className={styles.selecttype}>
                <select value={playType} onChange={(e) => handlePlayTypeChange(e.target.value)} className={styles.selectoption}>
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
                </select>
                <button onClick={handleCreateOrUpdate}>Create</button>
                <button onClick={handleUpdate}>Update</button>
            </div>

        </div>
    );
};

export default User;