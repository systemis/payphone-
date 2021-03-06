// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');


// some parameters for our scene
gameScene.init = function () {
  this.playerSpeed = 1.5;
  this.enemySpeed = 2;
  this.enemyMaxY = 280;
  this.enemyMinY = 80;
}

// load asset files for our game
gameScene.preload = function () {

  // load images
  this.load.image('background', 'assets/crossy/background.png');
  this.load.image('player', 'assets/crossy/player.png');
  this.load.image('dragon', 'assets/crossy/dragon.png');
  this.load.image('treasure', 'assets/crossy/treasure.png');
};

// executed once, after assets were loaded
gameScene.create = function () {
  this.cursors = this.input.keyboard.createCursorKeys();
  this.background = this.add.sprite(0, 0, 'background');
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');

  this.background.setOrigin(0, 0);
  this.player.setScale(0.5);

  this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
  this.treasure.setScale(0.6);

  this.enemies = this.add.group({
    key: 'dragon',
    repeat: 5,
    setXY: { x: 110, y: 100, stepX: 80, stepY: 20 }
  })

  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);
  Phaser.Actions.Call(this.enemies.getChildren(), enemy => {
    enemy.speed = Math.random() * 2 + 1;
  }, this);

  this.isPlayerAlive = true;
  this.cameras.main.resetFX();
};

// executed on every frame (60 times per second)
gameScene.update = function () {
  if (!this.isPlayerAlive) {
    return false;
  }

  if (this.cursors.up.isDown) {
    this.player.x += this.playerSpeed;
  }

  let enemies = this.enemies.getChildren();
  for (let i = 0; i < enemies.length; i++) {
    let component = enemies[i];
    enemies[i].y += enemies[i].speed;
    if (component.y >= this.enemyMaxY && component.speed > 0) {
      enemies[i].speed *= -1;
    } else if (component.y <= this.enemyMinY && component.speed < 0) {
      enemies[i].speed *= -1;
    }

    this.overlap(this.player.getBounds(), component.getBounds(), () => {
      // flag to set player is dead
      this.isPlayerAlive = false;

      // shake the camera
      this.cameras.main.shake(500);

      // fade camera
      this.time.delayedCall(250, function () {
        this.cameras.main.fade(250);
      }, [], this);

      // restart game
      this.time.delayedCall(500, function () {
        this.scene.restart();
      }, [], this);
    })
  }

  this.overlap(this.player.getBounds(), this.treasure.getBounds(), () => {
    this.gameOver();
  })
};

gameScene.overlap = function (bound1, bound2, callback) {
  if (Phaser.Geom.Intersects.RectangleToRectangle(bound1, bound2)) {
    callback();
  }
}

gameScene.gameOver = function () {
  this.isPlayerAlive = false;
  this.cameras.main.shake(500);

  console.log('Game over');
}

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene,
};

let game = new Phaser.Game(config);
