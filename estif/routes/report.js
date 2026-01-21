const express = require('express')
const router = express.Router()

const {createReport , getReportByUserName,deleteReportsBeforeDate} = require('../controllers/reportController') 
router.post('/delete', deleteReportsBeforeDate)
router.post('/' , createReport)
router.get('/:userName', getReportByUserName)




module.exports = router