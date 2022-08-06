import fs from 'fs';
import path from 'path';

const ABSENCES_PATH = path.join(__dirname, 'json_files', 'absences.json');
const MEMBERS_PATH = path.join(__dirname, 'json_files', 'members.json');

const readJsonFile = (path) => new Promise((resolve) => fs.readFile(path, 'utf8', (_, data) => resolve(data)))
  .then((data) => JSON.parse(data)).catch(e=>console.log(`readJsonFIle before parse error : ${e}`))
  .then((data) => data.payload).catch(e=>console.log(`readJsonFIle after parse error : ${e}`));

export const members = () => readJsonFile(MEMBERS_PATH);
export const absences = () => readJsonFile(ABSENCES_PATH);

