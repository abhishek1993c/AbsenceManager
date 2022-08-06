import express from 'express';
import { members } from '../api/api';

const router = express.Router();

//  @route      GET api/members/getAll
//  @desc       get memebr list
//  @access     Public
router.get('/getAll', (req, res)=>members().then(result=>{
    const meta:any = {};
    meta.total = result.length ?? 0;
    return res.status(200).send({meta, data: result});
}).catch(e=>{
    console.error(`members Error: ${e}`);
    return res.status(500).send({data: null, error: e})
}));

router.get('*',(req,res)=>res.status(404).send(`Endpoint does not exist.`));

export default router;