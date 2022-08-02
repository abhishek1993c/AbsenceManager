import express from 'express';
import { absences } from '../api/api';

const router = express.Router();

//  @route      GET api/absence/getAll
//  @desc       get absence list
//  @access     Public
router.get('/getAll', (req, res)=>absences().then(result=>{
    return res.status(200).send(result);
}).catch(e=>{
    console.error(`Absence Error: ${e}`);
    return res.status(500).send(e)
}));

router.get('*',(req,res)=>res.status(404).send(`Endpoint does not exist.`));

export default router;