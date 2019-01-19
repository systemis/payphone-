var height = 600, width = 600;
var config = {
  type: Phaser.AUTO,
  width,
  height,
  backgroundColor: '#eee',
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    }
  }
}

var game = new Phaser.Game(config);

function preload() {
  console.log(game.stage);
  game.stage.backgroundColor = '#eee';
}

function create() {

}

function update() {

}