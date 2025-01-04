import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { supabase } from '../store/Supabase';
import styles from '../css/FilterReport.module.css';

const FilterReport = () => {
  const { user } = useAuthContext();
  const [reportData, setReportData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('daily');
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  useEffect(() => {
    const fetchReportData = async () => {
      if (user && user.userName) {
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

  return (
    <div >
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
        <p className={styles.totalincome}>Total Income : {calculateTotalDeductedAmount()} Birr</p>
      </div>
    </div>
  );
};

export default FilterReport;