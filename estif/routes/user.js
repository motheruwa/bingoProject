const express = require('express')
const router = express.Router()

const {deleteUser,signupUser , loginUser,getUserByUserName,updateBalance,getAllUsers,updateUserPermission,updatePlayType } = require('../controllers/userController') 
router.put('/', updateUserPermission)

router.get('/' , getAllUsers)
router.post('/login' , loginUser)
router.post('/signup' , signupUser)
router.put('/update' , updateBalance)
router.put('/updatePlayType' , updatePlayType)
router.get('/:userName', getUserByUserName)
router.delete('/delete/:userName', deleteUser)




module.exports = router
