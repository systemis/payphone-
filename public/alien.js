window.onload = function () {
  var ps = {}, cursor;
  var game = new Phaser.Game(600, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  })

  function preload() {
    game.load
      .spritesheet('alien', 'assets/alien/gameart/aliensheet.png', 64, 64, 5, 0, 0);
    game.load
      .spritesheet('duane', 'assets/alien/gameart/spritesheet2.png', 104, 125, 10, 0, 0);
  }

  function create() {
    game.stage.backgroundColor = "#220055";
    cursor = game.input.keyboard.createCursorKeys();

    ps.duane = game.add.sprite(63, 475, 'duane');
    ps.duane.animations.add('kill');
    ps.duane.animations.play('kill', 12, true);

    ps.alien = game.add.sprite(240, 90, 'alien');
    ps.alien.animations.add('walk', [0, 1, 2, 3, 4, 3, 2, 1]);
    ps.alien.animations.play('walk', 8, true);

    ps.duane.anchor.setTo(0.5, 0.5);
    game.physics.enable(ps.duane, Phaser.Physics.ARCADE);

    ps.alien.anchor.setTo(0.5, 0.5);
    game.physics.enable(ps.alien, Phaser.Physics.ARCADE);
    ps.alien.body.velocity.x = 150;

    ps.duane.body.setSize(54, 75, 25, 25);
    ps.alien.body.setSize(44, 44, 10, 10);

    game.physics.arcade.collide(ps.duane, ps.alien, () => {
      ps.alien.destroy();
    })
  }

  function update() {
    game.world.wrap(ps.alien);
    game.world.wrap(ps.duane);

    ps.duane.body.velocity.x = 0;
    if (cursor.left.isDown) {
      ps.duane.body.velocity.x -= 150;
    } else if (cursor.right.isDown) {
      ps.duane.body.velocity.x += 150;
    }

    ps.duane.body.velocity.y = 0;
    if (cursor.up.isDown) {
      ps.duane.body.velocity.y = -150;
    } else if (cursor.down.isDown) {
      ps.duane.body.velocity.y = 150;
    }
  }
}