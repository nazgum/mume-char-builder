import express from 'express';
import fs from 'fs';
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('3478abcdefghijklmnopqrstuvwyz', 14)

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const db = new Low(new JSONFile('db.json'), {})

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('trust proxy', true);  // pass ip to express

app.use(express.static('static'))
app.use(express.json());

// logger
app.use((req,res,next) =>{
  const timestamp = new Date().toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(',', '');

  const logMessage = `${timestamp}   ${req.method}   ${req.ip}   ${req.path}   ${res.statusCode}\n`;

  // Log to a file if needed
  fs.appendFileSync('server.log', logMessage);

  next();
});


// main page
app.get('/', (req, res) => {
  res.render('pages/index')
})

// save a build and return url to it
app.post('/save', async (req, res) => {
  await db.read();
  
  const id = nanoid(); // generate build id

  //db.data.builds = {};  // erase all data
  db.data.builds[id] = req.body;
  await db.write()

  res.json({ link: `${req.headers.origin}/build/${id}` });
});

// load a build from url
app.get('/build/:id', async (req, res) => {
  await db.read();
  
  const build_data = db.data.builds[req.params.id];
  
  if (build_data) {
    res.render('pages/index', { build_data: JSON.stringify(build_data) });
  } else {
    res.status(404).send('Build not found');
  }
});

app.get('/build2/:data', (req, res) => {
  console.log('Received data:', req.params.data); // Log data
  res.render('pages/index', { encodedData: req.params.data });
})


app.use((req, res, next) => {
  res.status(404).send("Route does not exist.");
});

app.listen(port, () => {
  console.log(`Express listening on port ${port}`)
})
