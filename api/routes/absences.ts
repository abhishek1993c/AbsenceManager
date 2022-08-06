import express from 'express';
import { absences } from '../api/api';

const router = express.Router();

//  @route      GET api/absence/getAll
//  @desc       get absence list
//  @access     Public
router.get('/getAll', (req, res)=>absences().then(result=>{
    const meta:any = {};
    meta.total = result.length ?? 0;
    return res.status(200).send({meta, data: result});
}).catch(e=>{
    console.error(`Absence Error: ${e}`);
    return res.status(500).send({data: null, error: e})
}));

router.get('*',(req,res)=>res.status(404).send(`Endpoint does not exist.`));

export default router;