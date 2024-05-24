const express=require('express')
const User=require('../models/workoutmodel')
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout,
    login
}=require('../controller/workoutcontrolers')
const VerifyToken=require('../middleware/VerifyToken')
const verifyToken = require('../middleware/VerifyToken')
const router=express.Router()

router.get('/',verifyToken,getWorkouts)
    
router.get('/:id',verifyToken,getWorkout)

router.post('/',verifyToken,createWorkout)

router.post('/login',verifyToken,login)

router.delete('/:id',deleteWorkout) 

router.patch('/:id',verifyToken,updateWorkout)


router.get('/protected',verifyToken,(req,res)=>{
    res.send({message:"This is sensitive info"})
})
// Authorization:Bearer 

module.exports=router;
