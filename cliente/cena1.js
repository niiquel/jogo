import { cena2 } from "./cena2.js";

var cena1 = new Phaser.Scene("Cena 1");

var player1;
var player2;
var door;
var door1;
var door2;
var door3;
var finaldoor;
var key;
var key1;
var key2;
var key3;
var finalkey;
var cursors;
var gameOver = false;
var timer;
var timedEvent;
var timerText;
var jogador;
var ice_servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
var localConnection;
var remoteConnection;
var midias;
const audio = document.querySelector("audio");

cena1.preload = function () {
  // tilesets e mapa
  this.load.image("tilesets1", "./assets/tilesets1.png");
  this.load.image("tilesets2", "./assets/tilesets2.png");
  this.load.tilemapTiledJSON("mapa", "./assets/labirinto.json");

  // personagens
  this.load.spritesheet("player1", "./assets/sprite1.png", {
    frameWidth: 16,
    frameHeight: 16,
  });

  this.load.spritesheet("player2", "./assets/sprite2.png", {
    frameWidth: 15,
    frameHeight: 16,
  });

  this.load.spritesheet("door", "./assets/door.png", {
    frameWidth: 32,
    frameHeight: 26,
  });

  this.load.spritesheet("key", "./assets/key.png", {
    frameWidth: 16,
    frameHeight: 16,
  });
};

cena1.create = function () {
  timer = -1;

  // mapa
  const map = this.make.tilemap({ key: "mapa" });

  const tileset = map.addTilesetImage("assets", "tilesets1");
  const tileset2 = map.addTilesetImage("assets2", "tilesets2");

  // camadas
  const belowLayer1 = map.createLayer("belowlayer1", tileset, 0, 0);
  const belowLayer2 = map.createLayer("belowlayer2", tileset2, 0, 0);
  const worldLayer = map.createLayer("worldlayer", tileset2, 0, 0);

  // colisão com camadas
  worldLayer.setCollisionByProperty({ collides: true });

  //portas
  door = this.physics.add.sprite(688, 560, "door", 0);
  door1 = this.physics.add.sprite(176, 624, "door", 0);
  door2 = this.physics.add.sprite(208, 240, "door", 0);
  door3 = this.physics.add.sprite(752, 112, "door", 0);
  finaldoor = this.physics.add.sprite(400, 16, "door", 0);
  
  //chaves
   key = this.physics.add.sprite(718, 400, "key", 0);
   key1 = this.physics.add.sprite(46, 752, "key", 0);
   key2 = this.physics.add.sprite(494, 208, "key", 0);
   key3 = this.physics.add.sprite(654, 272, "key", 0);
   finalkey = this.physics.add.sprite(686, 48, "key", 0);
  
  // spawn
  player1 = this.physics.add.sprite(400, 768, "player1", 0);
  player2 = this.physics.add.sprite(752, 48, "player2", 0);

  //abrir portas
  this.physics.add.overlap(player1, door, openDoor, null, this);
  this.physics.add.overlap(player1, door1, openDoor, null, this);
  this.physics.add.overlap(player1, door2, openDoor, null, this);
  this.physics.add.overlap(player1, door3, openDoor, null, this);
  this.physics.add.overlap(player2, finaldoor, openDoor, null, this);



  //frames das animações jogador 1
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
      frames: [2, 1],
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

  //frames das animações jogador 2
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
      frames: [2, 1],
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

  //frames das animações portas
  this.anims.create({
    key: "abrir-porta",
    frames: this.anims.generateFrameNumbers("door", {
      start: 0,
      end: 1,
    }),
    frameRate: 3,
  });

  // Direcionais
  cursors = this.input.keyboard.createCursorKeys();

  // Contador na tela
   timerText = this.add.text(16, 16, "150", {
     fontSize: "32px",
     fill: "#fff",
   });
  
  // Conectar no servidor via WebSocket
  this.socket = io();

  // Disparar evento quando jogador entrar na partida
  var self = this;
  var physics = this.physics;
  var cameras = this.cameras;
  var time = this.time;
  var socket = this.socket;
  var add = this.add;

  this.socket.on("jogadores", function (jogadores) {
    if (jogadores.primeiro === self.socket.id) {
      // Define jogador como o primeiro
      jogador = 1;

      // Personagens colidem com os limites da cena
      player1.setCollideWorldBounds(true);

      // Colisão com camadas 1
      physics.add.collider(player1, worldLayer, null, null, this);
      
      // Câmera seguindo o personagem 1
      cameras.main.startFollow(player1);
      
      cameras.main.setZoom(5);

      cameras.main.setBounds(50, 50, 750, 750);

      // navigator.mediaDevices
      //   .getUserMedia({ video: false, audio: true })
      //   .then((stream) => {
      //     midias = stream;
      //   })
      //   .catch((error) => console.log(error));
    } else if (jogadores.segundo === self.socket.id) {
      // Define jogador como o segundo
      jogador = 2;

      // Personagens colidem com os limites da cena
      player2.setCollideWorldBounds(true);

      // Colisão com camadas 2
      physics.add.collider(player2, worldLayer, null, null, this);

      // Câmera seguindo o personagem 2
      //cameras.main.startFollow(player2);

      // navigator.mediaDevices
      //   .getUserMedia({ video: false, audio: true })
      //   .then((stream) => {
      //     midias = stream;
      //     localConnection = new RTCPeerConnection(ice_servers);
      //     midias
      //       .getTracks()
      //       .forEach((track) => localConnection.addTrack(track, midias));
      //     localConnection.onicecandidate = ({ candidate }) => {
      //       candidate &&
      //         socket.emit("candidate", jogadores.primeiro, candidate);
      //     };
      //     console.log(midias);
      //     localConnection.ontrack = ({ streams: [midias] }) => {
      //       audio.srcObject = midias;
      //     };
      //     localConnection
      //       .createOffer()
      //       .then((offer) => localConnection.setLocalDescription(offer))
      //       .then(() => {
      //         socket.emit(
      //           "offer",
      //           jogadores.primeiro,
      //           localConnection.localDescription
      //         );
      //       });
      //   })
      //   .catch((error) => console.log(error));
    }

    

    // Os dois jogadores estão conectados
    console.log(jogadores);
    if (jogadores.primeiro !== undefined && jogadores.segundo !== undefined) {
      // Contagem regressiva em segundos (1.000 milissegundos)
      timer = 150;
      timedEvent = time.addEvent({
        delay: 1000,
        callback: countdown,
        callbackScope: this,
        loop: true,
      });
    }
  });

  this.socket.on("offer", (socketId, description) => {
    remoteConnection = new RTCPeerConnection(ice_servers);
    midias
      .getTracks()
      .forEach((track) => remoteConnection.addTrack(track, midias));
    remoteConnection.onicecandidate = ({ candidate }) => {
      candidate && socket.emit("candidate", socketId, candidate);
    };
    remoteConnection.ontrack = ({ streams: [midias] }) => {
      audio.srcObject = midias;
    };
    remoteConnection
      .setRemoteDescription(description)
      .then(() => remoteConnection.createAnswer())
      .then((answer) => remoteConnection.setLocalDescription(answer))
      .then(() => {
        socket.emit("answer", socketId, remoteConnection.localDescription);
      });
  });

  socket.on("answer", (description) => {
    localConnection.setRemoteDescription(description);
  });

  socket.on("candidate", (candidate) => {
    const conn = localConnection || remoteConnection;
    conn.addIceCandidate(new RTCIceCandidate(candidate));
  });

  // Desenhar o outro jogador
  socket.on("desenharOutroJogador", ({ frame, x, y }) => {
    if (jogador === 1) {
      player2.setFrame(frame);
      player2.x = x + 8;
      player2.y = y + 7.5;
    } else if (jogador === 2) {
      player1.setFrame(frame);
      player1.x = x + 8;
      player1.y = y + 8;
    }
  });
};

cena1.update = function (time, delta) {
  //Sincronizar direcionais com movimentos
  if (jogador === 1 && timer >= 0) {
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
    this.socket.emit("estadoDoJogador", {
      frame: player1.anims.getFrameName(),
      x: player1.body.x,
      y: player1.body.y,
    });
  } else if (jogador === 2 && timer >= 0) {
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

    this.socket.emit("estadoDoJogador", {
      frame: player2.anims.getFrameName(),
      x: player2.body.x,
      y: player2.body.y,
    });
  }

  // Se o contador terminar segue para a cena 2
  if (timer === 0) {
    this.socket.disconnect();
    this.scene.start(cena2);
    this.scene.stop();
  }
};

function openDoor(player, door) {
  
  door.anims.play("abrir-porta", true);
}


function countdown() {
  //Contador decrementa em 1 segundo
  timer -= 1;
  timerText.setText(timer);
}

export { cena1 };
