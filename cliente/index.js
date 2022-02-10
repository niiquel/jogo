const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

 var player1
 var player2
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

    this.load.spritesheet("player2", "./assets/sprite2.png", {
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
    
    worldLayer.setCollisionByProperty({ collides: true });

    player1 = this.physics.add.sprite(400, 768, 'player1', 0);
    player2 = this.physics.add.sprite(752, 48, 'player2', 0);

    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);

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

    this.anims.create({
      key: "left2",
      frames: this.anims.generateFrameNumbers("player2", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

  this.anims.create({
      key: "right2",
      frames: this.anims.generateFrameNumbers("player2", {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

  this.anims.create({
      key: "stopped2",
      frames: this.anims.generateFrameNumbers("player2", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });

  this.anims.create({
      key: "up2",
      frames: this.anims.generateFrameNumbers("player2", {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "down2",
      frames: this.anims.generateFrameNumbers("player2", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(player2, worldLayer, null, null, this);

    cursors = this.input.keyboard.createCursorKeys();

    

    //  The score
    //scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });   
}

function update ()
{
    if (cursors.left.isDown) {
        player1.body.setVelocityX(-50);
        player1.anims.play("left1", true);
      } else if (cursors.right.isDown) {
        player1.body.setVelocityX(50);
        player1.anims.play("right1", true);
      } else {
        player1.body.setVelocity(0);
        player1.anims.play("stopped1", true);
      }
    if (cursors.up.isDown) {
        player1.body.setVelocityY(-50);
        player1.anims.play("up1", true);
      } else if (cursors.down.isDown) {
        player1.body.setVelocityY(50);
        player1.anims.play("down1", true);
      } else {
        player1.body.setVelocityY(0);
      }

      if (cursors.left.isDown) {
        player2.body.setVelocityX(-50);
        player2.anims.play("left2", true);
      } else if (cursors.right.isDown) {
        player2.body.setVelocityX(50);
        player2.anims.play("right2", true);
      } else {
        player2.body.setVelocity(0);
        player2.anims.play("stopped2", true);
      }
    if (cursors.up.isDown) {
        player2.body.setVelocityY(-50);
        player2.anims.play("up2", true);
      } else if (cursors.down.isDown) {
        player2.body.setVelocityY(50);
        player2.anims.play("down2", true);
      } else {
        player2.body.setVelocityY(0);
      }
}
