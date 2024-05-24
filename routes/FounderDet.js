const express=require('express')
const Founder=require('../models/FounderDetModel');
const{
    getFounderDets,
    getFounderDet,
    createFounderDet,
    deleteFounderDet,
    updateFounderDet                     
}=require('../controller/FounderDetControler');

const router=express.Router()

router.get('/',getFounderDets)

router.get('/:id',getFounderDet)

router.post('/',createFounderDet)


router.delete('/:id',deleteFounderDet)

router.patch('/', updateFounderDet);



module.exports=router;
