const express = require('express');
const app = express();

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index');
})

const server = require('http').Server(app);
server.listen(3000, () => {
  console.log('Server listening');
})