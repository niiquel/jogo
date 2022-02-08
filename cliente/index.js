var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
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
// var gameOver = false;
// var scoreText;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('imagens', 'cliente/assets/MasterSimple.png');    
    this.load.tilemapTiledJSON('mapa', 'cliente/assets/mapa1.json');
}

function create ()
{
    const map = this.make.tilemap({ key: 'mapa' });

    const tileset = map.addTilesetImage('assets', 'imagens');

    const belowLayer = map.createStaticLayer('grama', tileset, 0, 0) ('chão', tileset, 0, 0)
    const worldLayer = map.createStaticLayer('árvores e pedras', tileset, 0, 0);
    
    worldLayer.setCollisionByProperty({ collider: true })
    //player1 = this.physics.add.sprite(384, 768, 'player1')
    //player2 = this.physics.add.sprite(736, 48, 'player2')

    //  Player physics properties. Give the little guy a slight bounce.
    //player.setBounce(0.2);
    //player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    // this.anims.create({
       // key: 'left',
       // frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      // frameRate: 10,
      // repeat: -1
    });

    // this.anims.create({
       // key: 'turn',
       // frames: [ { key: 'dude', frame: 4 } ],
       // frameRate: 20
    });

    // this.anims.create({
       // key: 'right',
       // frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
       // frameRate: 10,
       // repeat: -1
    });

    //  Input Events
    // cursors = this.input.keyboard.createCursorKeys();

    //  The score
    //scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });   
}

function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
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