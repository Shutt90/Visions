import Phaser from 'phaser'
import Hospital1 from './scenes/hospital1'

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [Hospital1],
    zoom: 1

};


var game = new Phaser.Game(config);