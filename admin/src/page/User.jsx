import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { supabase } from '../store/Supabase';
import { supabase1 } from '../store/Supabase1';
import { supabase2 } from '../store/Supabase2';
import { supabase3 } from '../store/Supabase3';
import { supabase4 } from '../store/Supabase4';
import styles from '../css/User.module.css'
const User = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [newPermission, setNewPermission] = useState();
    const [reportData, setReportData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('daily');
    const [filteredData, setFilteredData] = useState([]);


    useEffect(() => {
        const fetchReportData = async () => {
          if (user && user.userName) { // Check if user and userName are not null
            try {
              const { data, error } = await supabase2
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
          const currentDay = currentDate.getDay();
          const weekStart = new Date(currentDate);
          const daysToMonday = currentDay === 0 ? 6 : currentDay - 1;
          
          weekStart.setDate(currentDate.getDate() - daysToMonday); // Start from the previous Monday
      
          const filtered = reportData.filter(report => {
            const reportDate = new Date(report.created_at);
            return reportDate >= weekStart && reportDate <= currentDate;
          });
          setFilteredData(filtered);
        }else if (selectedOption === 'monthly') {
          const currentDate = new Date();
          const monthStart = new Date(currentDate);
          monthStart.setDate(currentDate.getDate() - 29); // Start from 29 days ago
      
          const filtered = reportData.filter(report => {
            const reportDate = new Date(report.created_at);
            return reportDate >= monthStart && reportDate <= currentDate;
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
        <option value="monthly">Monthly</option>
      </select>
      <button onClick={filterData}>Show Data</button>
        </div>
      

      <div className={styles.total}>
        <p className={styles.totalincome}>Total Income : {calculateTotalDeductedAmount()}</p>
      </div>
    </div>
        </div>
    );
};

export default User;