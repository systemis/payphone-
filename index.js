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
  const plusOne = (arr = []) => {
    let index = arr.length - 1;
    while (arr[index] == 9) {
      arr[index] = 0;
      index -= 1;
    }

    if (index >= 0) {
      arr[index] += 1;
    } else {
      arr = [1, ...arr];
    }

    console.log(arr);
  }

  plusOne([4, 3, 2, 1])
})