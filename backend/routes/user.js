const express = require('express')
const router = express.Router()

const {signupUser , loginUser,getUserByUserName,updateBalance,getAllUsers,updateUserPermission } = require('../controllers/userController') 
router.put('/', updateUserPermission)

router.get('/' , getAllUsers)
router.post('/login' , loginUser)
router.post('/signup' , signupUser)
router.put('/update' , updateBalance)
router.get('/:userName', getUserByUserName)




module.exports = router
