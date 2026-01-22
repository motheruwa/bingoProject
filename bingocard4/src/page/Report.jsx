import React, { useState, useEffect } from "react";
import styles from "../css/Report.module.css";
import { useAuthContext } from "../hooks/useAuthContext";
import FilterReport from "./FilterReport";
import { Link } from "react-router-dom";
import axios from "axios";

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
    // eslint-disable-next-line
  const [userName, setUserName] = useState("");
  const [filteredReportData, setFilteredReportData] = useState([]);
  // eslint-disable-next-line
  const [fetchedUser, setFetchedUser] = useState([]);
  // eslint-disable-next-line
  const { user } = useAuthContext();

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
  }, [selectedDate, user]);

  const getReportsByUserName = async (userName) => {
    try {
      const response = await axios.get(
        `https://binx2.mrxbingo.com/api/report/${userName}`
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
  const fetchUserByUsername = async (userName) => {
    try {
      const response = await axios.get(
        `https://binx2.mrxbingo.com/api/user/${userName}`
      );
      console.log("Fetched user by username:", response.data);
      setFetchedUser(response.data);
      localStorage.setItem("playType", response.data.playType);
      // Handle the fetched user data as needed
    } catch (error) {
      console.error("Error fetching user by username:", error);
      // Handle errors
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      fetchUserByUsername(user.userName);
    }
  }, [user]);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleShowData = () => {
    const formattedSelectedDate = new Date(selectedDate).toISOString().slice(0, 10);

    const filteredData = reportData.filter((report) => {
      const formattedCreatedAt = new Date(report.createdAt).toISOString().slice(0, 10);
      return formattedCreatedAt === formattedSelectedDate;
    }).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Sort by created_at in ascending order

    setFilteredReportData(filteredData);
};

  const totalDeductedAmount = filteredReportData.reduce(
    (acc, curr) => acc + curr.deductedAmount,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.date}>
        <Link to="/startbingo" className={styles.home}>
          Home
        </Link>
        <input
          type="date"
          id="dateInput"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button onClick={handleShowData} className={styles.showdata}>Show Data</button>
        <div className={styles.balance}>
          <span>balance :</span> {fetchedUser.balance}
        </div>
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
          <p className={styles.totalincome}>
            Total Income: {totalDeductedAmount}
          </p>
        </div>
      )}
      <div className={styles.filterreport}>
        <FilterReport />
      </div>
    </div>
  );
};

export default Report;
