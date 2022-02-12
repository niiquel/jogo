 var cena1 = new Phaser.Scene("Cena 1");
 var player1;
 var player2;
 var cursors;
 var gameOver = false;
// var scoreText;

cena1.preload = function ()
{
    // tilesets e mapa
    this.load.image('imagens', './assets/MasterSimple.png');    
    this.load.tilemapTiledJSON('mapa', './assets/labirinto.json');

    // personagens 
    this.load.spritesheet("player1", "./assets/sprite1.png", {
        frameWidth: 15,
        frameHeight: 16,
      });

    this.load.spritesheet("player2", "./assets/sprite2.png", {
        frameWidth: 15,
        frameHeight: 16,
      });
}

cena1.create = function ()
{
    // mapa
    const map = this.make.tilemap({ key: 'mapa' });

    const tileset = map.addTilesetImage('assets', 'imagens');

    // camadas
    const belowLayer1 = map.createLayer('belowlayer1', tileset, 0, 0);
    const belowLayer2 = map.createLayer('belowlayer2', tileset, 0, 0);
    const worldLayer = map.createLayer('worldlayer', tileset, 0, 0);
    
    // colisão com camadas
    worldLayer.setCollisionByProperty({ collides: true });

    // spawn
    player1 = this.physics.add.sprite(400, 768, 'player1', 0);
    player2 = this.physics.add.sprite(752, 48, 'player2', 0);

    //colisão com bordas
    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);

    //frames das animações
    this.anims.create({
        key: "left1",
        frames: this.anims.generateFrameNumbers("player1", {
          start: 3,
          end: 5,
        }),
        frameRate: 7,
        repeat: -1,
      });

    this.anims.create({
        key: "right1",
        frames: this.anims.generateFrameNumbers("player1", {
          start: 6,
          end: 8,
        }),
        frameRate: 7,
        repeat: -1,
      });

    this.anims.create({
        key: "stopped1",
        frames: this.anims.generateFrameNumbers("player1", {
          frames: [2,1],
        }),
        frameRate: 3,
        repeat: -1,
      });

    this.anims.create({
        key: "up1",
        frames: this.anims.generateFrameNumbers("player1", {
          start: 9,
          end: 11,
        }),
        frameRate: 7,
        repeat: -1,
      });

      this.anims.create({
        key: "down1",
        frames: this.anims.generateFrameNumbers("player1", {
          start: 0,
          end: 2,
        }),
        frameRate: 7,
        repeat: -1,
      });

    this.anims.create({
      key: "left2",
      frames: this.anims.generateFrameNumbers("player2", {
        start: 3,
        end: 5,
      }),
      frameRate: 7,
      repeat: -1,
    });

  this.anims.create({
      key: "right2",
      frames: this.anims.generateFrameNumbers("player2", {
        start: 6,
        end: 8,
      }),
      frameRate: 7,
      repeat: -1,
    });

  this.anims.create({
      key: "stopped2",
      frames: this.anims.generateFrameNumbers("player2", {
        frames: [2,1]
      }),
      frameRate: 3,
      repeat: -1,
    });

  this.anims.create({
      key: "up2",
      frames: this.anims.generateFrameNumbers("player2", {
        start: 9,
        end: 11,
      }),
      frameRate: 7,
      repeat: -1,
    });

    this.anims.create({
      key: "down2",
      frames: this.anims.generateFrameNumbers("player2", {
        start: 0,
        end: 2,
      }),
      frameRate: 7,
      repeat: -1,
    });

    // Colisão com cenário
    this.physics.add.collider(player1, worldLayer, null, null, this);

    this.physics.add.collider(player2, worldLayer, null, null, this);

    // Direcionais
    cursors = this.input.keyboard.createCursorKeys();

    

    //  The score
    //scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });   
}

cena1.update = function ()
{
  
  //Sincronizar direcionais com movimentos
  if (cursors.left.isDown) {
    player1.body.setVelocityX(-50);
  } else if (cursors.right.isDown) {
    player1.body.setVelocityX(50);
  } else {
    player1.body.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    player1.body.setVelocityY(-50);
  } else if (cursors.down.isDown) {
    player1.body.setVelocityY(50);
  } else {
    player1.body.setVelocityY(0);
  }

  if (cursors.left.isDown) {
    player2.body.setVelocityX(-50);
  } else if (cursors.right.isDown) {
    player2.body.setVelocityX(50);
  } else {
    player2.body.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    player2.body.setVelocityY(-50);
  } else if (cursors.down.isDown) {
    player2.body.setVelocityY(50);
  } else {
    player2.body.setVelocityY(0);
  }

  // Sincronizar direcionais e animações
  if (cursors.left.isDown) {
    player1.anims.play("left1", true);
  } else if (cursors.right.isDown) {
    player1.anims.play("right1", true);
  } else if (cursors.up.isDown) {
    player1.anims.play("up1", true);
  } else if (cursors.down.isDown) {
    player1.anims.play("down1", true);
  } else {
    player1.anims.play("stopped1", true);
  }

  if (cursors.left.isDown) {
    player2.anims.play("left2", true);
  } else if (cursors.right.isDown) {
    player2.anims.play("right2", true);
  } else if (cursors.up.isDown) {
    player2.anims.play("up2", true);
  } else if (cursors.down.isDown) {
    player2.anims.play("down2", true);
  } else {
    player2.anims.play("stopped2", true);
  }
}

export { cena1 };