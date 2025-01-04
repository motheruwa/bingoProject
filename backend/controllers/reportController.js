const db = require('../config/db');

const createReport = async (req, res) => {
    const { round, selectedAmount, deductedAmount, userName, winAmount, noOfPlayer } = req.body;
  
    try {
      const query = `
        INSERT INTO report (round, selectedAmount, deductedAmount, userName, winAmount, noOfPlayer)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
  
      const result = await new Promise((resolve, reject) => {
        db.query(query, [round, selectedAmount, deductedAmount, userName, winAmount, noOfPlayer], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
  
      return res.status(200).json({ message: 'New Report Created', report: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something Went Wrong' });
    }
  };
  const getReportByUserName = async (req, res) => {
    const { userName } = req.params;
  
    try {
      const userQuery = `
        SELECT * FROM user WHERE userName = ?;
      `;
      const user = await new Promise((resolve, reject) => {
        db.query(userQuery, [userName], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        });
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const reportsQuery = `
        SELECT * FROM report WHERE userName = ?;
      `;
      const reports = await new Promise((resolve, reject) => {
        db.query(reportsQuery, [userName], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
  
      if (!reports || reports.length === 0) {
        return res.status(404).json({ error: 'No reports found for this user' });
      }
  
      res.status(200).json(reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = { createReport, getReportByUserName };