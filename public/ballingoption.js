class mainScene {
  preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('coin', 'assets/coin.png');
  }

  create() {
    this.player = this.physics.add.sprite(100, 100, 'player');
    this.coin = this.physics.add.sprite(300, 300, 'coin');

    this.scrore = 0;
    let style = { font: '20px Arial', fill: '#fff' };
    this.scoreText = this.add.text(20, 20, `score: ${this.scrore}`, style);
    this.cursor = this.input.keyboard.createCursorKeys();
    console.log(this.coin)
  }

  update() {
    if (this.cursor.right.isDown) {
      this.player.x += 3;
    } else if (this.cursor.left.isDown) {
      this.player.x -= 3;
    } else if (this.cursor.up.isDown) {
      this.player.y -= 3;
    } else if (this.cursor.down.isDown) {
      this.player.y += 3;
    }

    this.hit();
  }

  hit() {
    var xA = this.player.x, yA = this.player.y;
    var xB = this.coin.x, yB = this.coin.y;

    if (Math.abs(xA - xB) <= 6 && Math.abs(yB - yB) <= 6) {
      console.log('Overlap')
      this.coin.x = Phaser.Math.Between(100, 600);
      this.coin.y = Phaser.Math.Between(100, 300);

      this.scrore += 10;
      this.scoreText.setText(`score: ${this.scrore}`);
    }

    return;
  }
}

const width = 700, height = 400;
new Phaser.Game({
  width, height,
  backgroundColor: '#3498db',
  scene: mainScene,
  physics: { default: 'arcade' },
  parent: 'game'
})