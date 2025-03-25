import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import styles from "../css/FilterReport.module.css";
import axios from "axios";

const FilterReport = () => {
  const { user } = useAuthContext();
  const [reportData, setReportData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("daily");
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchReportData = async () => {
      if (user && user.userName) {
        try {
          const data = await getReportsByUserName(user.userName);
          setReportData(data);
          if (reportData && reportData.length > 0) {
            console.log("Report Data:", reportData);
          }
        } catch (error) {
          console.error("Error fetching report data:", error.message);
        }
      }
    };

    fetchReportData();
    // eslint-disable-next-line
  }, [user]);

  const getReportsByUserName = async (userName) => {
    try {
      const response = await axios.get(
        `https://bin.zaahirahtravels.com/api/report/${userName}`
      );

      if (response.status === 200) {
        return response.data;
      } else if (response.status === 404) {
        return { error: "No reports found for this user" };
      } else {
        throw new Error("Failed to fetch reports. Status: " + response.status);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  };

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
  return (
    <div>
      <div className={styles.select}>
        <select
          value={selectedOption}
          onChange={(e) => handleOptionChange(e.target.value)}
          className={styles.selectoption}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="custom">Custom</option>
        </select>
        {selectedOption === "custom" && (
          <div className={styles.custom}>
            <label>From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <label>To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        )}
        <button onClick={filterData} className={styles.showdata}>Show Data</button>
      </div>

      <div className={styles.total}>
        <p className={styles.totalincome}>
          Total Income : {calculateTotalDeductedAmount()} Birr
        </p>
      </div>
    </div>
  );
};

export default FilterReport;
