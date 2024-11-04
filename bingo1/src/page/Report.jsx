import React, { useState, useEffect } from 'react';
import { supabase } from '../store/Supabase';
import styles from '../css/Report.module.css';
import { useAuthContext } from '../hooks/useAuthContext';
import FilterReport from './FilterReport';
import { Link } from 'react-router-dom'; 
import axios from 'axios'
const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredReportData, setFilteredReportData] = useState([]);
  const [fetchedUser, setFetchedUser] = useState([]);
   // eslint-disable-next-line
  const [userName, setUserName] = useState('');
  const { user } = useAuthContext();


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
    const fetchReportData = async () => {
      if (user && user.userName) { // Check if user and userName are not null
        try {
          const { data, error } = await supabase
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
  }, [selectedDate, user]); // Fetch data whenever the selected date or user changes

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleShowData = () => {
    const formattedSelectedDate = new Date(selectedDate).toISOString().slice(0, 10);

    const filteredData = reportData.filter((report) => {
      const formattedCreatedAt = new Date(report.created_at).toISOString().slice(0, 10);
      return formattedCreatedAt === formattedSelectedDate;
    });

    setFilteredReportData(filteredData);
  };

  const totalDeductedAmount = filteredReportData.reduce((acc, curr) => acc + curr.deductedAmount, 0);


  return (
    <div className={styles.container}>
      <div className={styles.date}>
      <Link to="/startbingo" className={styles.home}>Home</Link>
        <input
          type="date"
          id="dateInput"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button onClick={handleShowData}>Show Data</button>
        <div className={styles.balance}><span>balance :</span> {fetchedUser.balance}</div>
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
      <div className={styles.filterreport}>
        <FilterReport />
      </div>
    </div>
  );
};

export default Report;