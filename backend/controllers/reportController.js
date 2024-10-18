const Report = require('../models/reportModel')
const mongoose = require('mongoose')


const createReport = async (req, res) => {
    try {
        const { userName, deposit, deductedAmount, noOfPlayer } = req.body;

        // Create a new report instance
        const newReport = new Report({
            userName,
            deposit,
            deductedAmount,
            noOfPlayer
        });

        // Save the new report to the database
        await newReport.save();

        res.status(201).json({ message: 'Report created successfully', report: newReport });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ error: 'An error occurred while creating the report' });
    }
};

module.exports = { createReport };