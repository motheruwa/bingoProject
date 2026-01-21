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

  const deleteReportsBeforeDate = async (req, res) => {
    const { userName, selectedDate } = req.body;
    try {
        const selectedDateObj = new Date(selectedDate);
        const year = selectedDateObj.getFullYear();
        const month = ('0' + (selectedDateObj.getMonth() + 1)).slice(-2);
        const day = ('0' + selectedDateObj.getDate()).slice(-2);
        const hours = ('0' + selectedDateObj.getHours()).slice(-2);
        const minutes = ('0' + selectedDateObj.getMinutes()).slice(-2);
        const seconds = ('0' + selectedDateObj.getSeconds()).slice(-2);
        const milliseconds = ('00' + selectedDateObj.getMilliseconds()).slice(-3);

        const selectedDateFormatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

        const deleteQuery = `
            DELETE FROM report
            WHERE userName = ? AND createdAt < ?
        `;
        
        db.query(deleteQuery, [userName, selectedDateFormatted], (error, results) => {
            if (error) {
                console.error('Error deleting reports:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const numDeleted = results.affectedRows;

            if (numDeleted === 0) {
                console.log('No reports were deleted. Check the query parameters and database records.');
            } else {
                console.log(`Deleted ${numDeleted} reports`);
            }

            return res.status(200).json({ message: 'Reports deleted successfully', numDeleted });
        });
    } catch (error) {
        console.error('Error deleting reports:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createReport, getReportByUserName,deleteReportsBeforeDate };