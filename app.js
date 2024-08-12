const express = require('express')
const app = express()
const port = 3000

const fs = require('fs');

app.set('view engine', 'ejs')
app.set('trust proxy', true);  // pass ip to express

app.use(express.static('static'))

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

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.use((req, res, next) => {
  res.status(404).send("Route does not exist.");
});

app.listen(port, () => {
  console.log(`Express listening on port ${port}`)
})
