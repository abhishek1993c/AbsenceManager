import express from 'express';
import { absences } from '../api/api';
import { members } from '../api/api';

const router = express.Router();

const getStatus = (confirmed: Date, rejected: Date) => {
  if (confirmed !== null ) return 'Confirmed';
  if (rejected !== null ) return 'Rejected';
  return 'Requested';

}

//  @route      GET api/computed/getTableData
//  @desc       get computed list
//  @access     Public
router.get('/getTableData', async (req, res) => {
  Promise.all([absences(), members()]).then((responses)=>{
    const [absencesRes, membersRes] = responses;
    const computedRes = absencesRes.map((absence: any)=>{
      let obj = absence;
      obj.name = membersRes.filter((member: any)=> member.userId === obj.userId).map((member: any)=> member.name)[0];
      obj.status = getStatus(obj.confirmedAt, obj.rejectedAt);
      if(obj.memberNote.length == 0) obj.memberNote= '-';
      if(obj.admitterNote.length == 0) obj.admitterNote= '-';
      delete obj.id;
      return obj;
    });
    res.status(200).send(computedRes);
  });
});

router.get('*',(req,res)=>res.status(404).send(`Endpoint does not exist.`));

export default router;