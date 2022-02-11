import { cena1 } from "./cena1.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    parent: "game-container",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [cena1],
};

const game = new Phaser.Game(config);