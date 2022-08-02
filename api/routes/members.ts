import express from 'express';
import { members } from '../api/api';

const router = express.Router();

//  @route      GET api/members/getAll
//  @desc       get memebr list
//  @access     Public
router.get('/getAll', (req, res)=>members().then(result=>{
    return res.status(200).send(result);
}).catch(e=>{
    console.error(`members Error: ${e}`);
    return res.status(500).send(e)
}));

router.get('*',(req,res)=>res.status(404).send(`Endpoint does not exist.`));

export default router;