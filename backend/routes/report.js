const express = require('express')
const router = express.Router()

const {createReport , getReportByUserName} = require('../controllers/reportController') 

router.post('/' , createReport)
router.get('/:userName', getReportByUserName)




module.exports = router