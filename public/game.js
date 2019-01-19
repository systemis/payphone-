var config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
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
}

var game = new Phaser.Game(config);
var platforms, player, stars, cursors, bombs = [];
var score = 0, scoreText;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude', 'assets/dude.png', {
    frameWidth: 32, frameHeight: 48
  })
}

function create() {
  console.log(game.stage);

  this.add.image(400, 300, 'sky');

  cursors = this.input.keyboard.createCursorKeys();
  platforms = this.physics.add.staticGroup();
  bombs = this.physics.add.staticGroup();

  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground').refreshBody();
  platforms.create(50, 250, 'ground').refreshBody();
  platforms.create(750, 220, 'ground').refreshBody();



  player = this.physics.add.sprite(100, 150, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20,
  })

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  })

  player.body.setGravityY(300);

  stars = this.physics.add.group({
    key: 'star',
    repeat: 10,
    setXY: { x: 32, y: 0, stepX: 70 }
  })

  // bombs = this.physics.add.group({
  //   key: 'bomb',
  //   repeat: 5,
  //   setXY: { x: 30, y: 8, stepX: 10 }
  // })

  for (let i = 0; i < 7; i++) {
    let xPos = Math.floor((Math.random() * 600) + 1);
    let yPos = Math.floor((Math.random() * 600) + 1);
    bombs.create(xPos, yPos, 'bomb').refreshBody();
  }

  stars.children.iterate(child => {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  })


  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(player, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);
  this.physics.add.overlap(player, bombs, (player, bomb) => {
    bomb.disableBody(true, true);
    score -= 20;
    scoreText.setText(`Score: ${score}`);
  }, null, this)

}

function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText('Score: ' + score);
}

function update() {
  // bombs.map(bomb => hanldingEatBomb(bomb));
  player.x == 0 && player.y == 0 ? console.log('Overlap') : null;

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  cursors.up.isDown ? player.setVelocityY(-330) : '';
}

function hanldingEatBomb(bomb) {
  if (player.x == bomb.x && player.y === bomb.y) {
    console.log('Hel')
    score -= 20;
    scoreText.setText(`Score: ${score}`);
  }
}

function tryd() { console.log(this) }