// Hero

import heroPNG from '../assets/sprites/mentalman.png';
import heroJSON from '../assets/sprites/mentalman.json';

// Objects

// Enemies

import doctorPNG from '../assets/enemies/doctor.png';
import doctorJSON from '../assets/enemies/doctor.json';
import demonPNG from '../assets/enemies/demon-doc.png';
import demonJSON from '../assets/enemies/demon-doc.json';

// Maps

import hospitalCorridorsPNG from '../assets/maps/hospitalCorridors.png'
import hospitalCorridorsJSON from '../assets/maps/hospitalCorridors.json'


let gameOver = false;


class Hospital1 extends Phaser.Scene
{
    constructor() {
        super({key: "Hospital1" });
  }
    preload () {

        this.load.aseprite('hero', heroPNG, heroJSON)
        this.load.aseprite('doctor', doctorPNG, doctorJSON)
        this.load.image('hospitalImage', hospitalCorridorsPNG);
        this.load.tilemapTiledJSON('hospitalTiles', hospitalCorridorsJSON);
    }

    create () {    
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.anims.createFromAseprite('doctor')

        const map = this.make.tilemap({key: 'hospitalTiles'})
        const tileset = map.addTilesetImage('newhospital', 'hospitalImage', 32, 32, 0, 0);
        const floor = map.createLayer('floor', tileset, 0, 0);
        const walls = map.createLayer('walls', tileset, 0, 0);
        const otherwalls = map.createLayer('otherwalls', tileset, 0, 0);

        this.hero = this.physics.add.sprite(50, 50, 'hero')
        this.doctor = this.physics.add.sprite(300, 100, 'doctor')
        this.hero.setCollideWorldBounds(true)
        this.doctor.setCollideWorldBounds(true)
        this.hero.setScale(1.5)
        this.doctor.setScale(1.5)

        this.physics.add.collider(this.hero, walls)
        this.physics.add.collider(this.hero, this.doctor, function() {
            this.scene.restart()

        }, null, this)
        
    }

    update() {

        // Vertical movement

        if(this.keyW.isDown){
            this.hero.setVelocityY(-100)
        } else if(this.keyS.isDown) {
            this.hero.setVelocityY(100)
        } else {d
            this.hero.setVelocityY(0)
        }

        // Horizontal movement

        if(this.keyA.isDown){
            this.hero.setVelocityX(-100)
        } else if(this.keyD.isDown) {
            this.hero.setVelocityX(100)
        } else {
            this.hero.setVelocityX(0)
        }

        var dist = Phaser.Math.Distance.BetweenPoints(this.hero, this.doctor);

        if(dist < 100) {
            this.doctor.play('transform', true)
            this.physics.moveToObject( this.doctor, this.hero)
        }

    }

    
}



export default Hospital1;
