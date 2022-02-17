import { cena1 } from './cena1.js';

var cena0 = new Phaser.Scene('Cena 0');

cena0.preload = function () {

    this.load.image('abertura', 'assets/cena0.png');
    this.load.image('play', 'assets/play.png')
};

cena0.create = function () {

    this.add.image(400, 400, 'abertura');
    var button = this.add.image(385, 753, 'play').setInteractive();

    button.on(
        'pointerdown',
        function () {
            this.scene.start(cena1);
        },
        this
    );
};

cena0.update = function () {};

export { cena0 };