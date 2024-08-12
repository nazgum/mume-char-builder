const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(express.static('static'))

// logger
app.use((req,res,next) =>{
  req.time = new Date(Date.now()).toString();
  console.log(req.method,req.hostname, req.path, req.time);
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
