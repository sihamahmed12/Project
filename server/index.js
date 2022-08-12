const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const {getJournals, deleteJournal, createJournal, updateJournal} = require('./controller');

app.get('/api/journal', getJournals);
app.delete('/api/journal/:id', deleteJournal);
app.post('/api/journal', createJournal);
app.put('/api/journal/:id', updateJournal);

app.listen(4004,() => console.log("Port 4004"))