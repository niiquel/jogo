const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// var player1;
// var player2;
 var cursors
 var gameOver = false;
// var scoreText;

const game = new Phaser.Game(config);

function preload ()
{
    this.load.image('imagens', './assets/MasterSimple.png');    
    this.load.tilemapTiledJSON('mapa', './assets/labirinto.json');

    this.load.spritesheet("player1", "./assets/sprite1.png", {
        frameWidth: 15,
        frameHeight: 16,
      });
}

function create ()
{
    const map = this.make.tilemap({ key: 'mapa' });

    const tileset = map.addTilesetImage('assets', 'imagens');

    const belowLayer1 = map.createLayer('belowlayer1', tileset, 0, 0);
    const belowLayer2 = map.createLayer('belowlayer2', tileset, 0, 0);
    const worldLayer = map.createLayer('worldlayer', tileset, 0, 0);
    
    worldLayer.setCollisionByProperty({ collides: true })

    player1 = this.physics.add.sprite(384, 768, 'player1', 0)
    //player2 = this.physics.add.sprite(736, 48, 'player2')

    
    player1.setCollideWorldBounds(true);

    this.anims.create({
        key: "left1",
        frames: this.anims.generateFrameNumbers("player1", {
          start: 3,
          end: 5,
        }),
        frameRate: 10,
        repeat: -1,
      });

    this.anims.create({
        key: "right1",
        frames: this.anims.generateFrameNumbers("player1", {
          start: 6,
          end: 8,
        }),
        frameRate: 10,
        repeat: -1,
      });

    this.anims.create({
        key: "stopped1",
        frames: this.anims.generateFrameNumbers("player1", {
          start: 0,
          end: 1,
        }),
        frameRate: 2,
        repeat: -1,
      });

    this.anims.create({
        key: "up1",
        frames: this.anims.generateFrameNumbers("player1", {
          start: 9,
          end: 11,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "down1",
        frames: this.anims.generateFrameNumbers("player1", {
          start: 0,
          end: 2,
        }),
        frameRate: 10,
        repeat: -1,
      });

    this.physics.add.collider(player1, worldLayer, null, null, this);

    cursors = this.input.keyboard.createCursorKeys();

    

    //  The score
    //scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });   
}

function update ()
{
    if (cursors.left.isDown) {
        player1.body.setVelocityX(-100);
        player1.anims.play("left1", true);
      } else if (cursors.right.isDown) {
        player1.body.setVelocityX(100);
        player1.anims.play("right1", true);
      } else {
        player1.body.setVelocity(0);
        player1.anims.play("stopped1", true);
      }
      if (cursors.up.isDown) {
        player1.body.setVelocityY(-100);
      } else if (cursors.down.isDown) {
        player1.body.setVelocityY(100);
      } else {
        player1.body.setVelocityY(0);
      }
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}