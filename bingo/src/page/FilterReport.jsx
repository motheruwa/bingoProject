import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { supabase } from '../store/Supabase';
import styles from '../css/FilterReport.module.css'
const FilterReport = () => {
  const { user } = useAuthContext();
  const [reportData, setReportData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('daily');
  const [filteredData, setFilteredData] = useState([]);

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

  return (
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
        <p className={styles.totalincome}>Total Income : {calculateTotalDeductedAmount()} Birr</p>
        <p className={styles.totalincome}>20% : {calculateTotalDeductedAmount() * 0.2} Birr</p>
      </div>
    </div>
  );
};

export default FilterReport;