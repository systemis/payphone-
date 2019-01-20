var width = 600, height = 600;
var config = {
  type: Phaser.AUTO,
  width, height,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },

  backgroundColor: '#000'
}

var game = new Phaser.Game(config);
var snake, apple, squareSize, score, speed, updateDelay, direction, new_direction, addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;

function preload() {
  this.load.image('menu', 'assets/menu.png');
  this.load.image('sky', 'assets/sky.png');
  this.load.image('snake', 'assets/snake.png');
  this.load.image('apple', 'assets/apple.png');

}

function create() {
  // this.add.image(width / 2, height / 2, 'menu');

  snake = [];
  apple = {};
  squareSize = 15;
  score = 0;
  speed = 0;
  updateDelay = 0;
  direction = 'right';
  new_direction = null;
  addNew = false;

  cursors = this.input.keyboard.createCursorKeys();

  for (let i = 0; i < 10; i++) {
    snake.push(this.add.sprite(150 + i * squareSize, 150, 'snake'));
  }

  const gen = generateApple.bind(this);
  gen();

  textStyle_Key = { font: 'bold 14px sans-serif', fill: '#46c0f9', align: 'center' };
  textStyle_Value = { font: 'bild 10px sans-serif', fill: '#fff', align: 'center' };

  this.add.text(30, 20, 'Score', textStyle_Key);
  scoreTextValue = this.add.text(90, 18, score.toString(), textStyle_Value);

  this.add.text(500, 20, 'Speed', textStyle_Key);
  speedTextValue = this.add.text(558, 10, speed.toString(), textStyle_Value);
}

function update() {
  if (cursors.right.isDown && direction !== 'left') {
    new_direction = 'right';
  } else if (cursors.left.isDown && direction !== 'right') {
    new_direction = 'left';
  } else if (cursors.up.isDown && direction !== 'down') {
    new_direction = 'up';
  } else if (cursors.down.isDown && direction !== 'up') {
    new_direction = 'down';
  }

  speed = Math.min(10, Math.floor(score / 5));
  speedTextValue.text = '' + speed;

  updateDelay++;

}

function generateApple() {
  var randomX = Math.floor(Math.random() * 40) * squareSize;
  var randomY = Math.floor(Math.random() * 30) * squareSize;

  apple = this.add.sprite(randomX, randomY, 'apple');
} 
