const express=require('express')
const Company=require('../models/CompFormModel')
const{
    getCompForms,
    getCompForm,
    createCompForm,
    deleteCompForm,
    updateCompForm
}=require('../controller/CompFormControler')

const router=express.Router()

router.get('/',getCompForms)

router.get('/:id',getCompForm)

router.post('/',createCompForm)


router.delete('/:id',deleteCompForm)

router.patch('/', updateCompForm);



module.exports=router;