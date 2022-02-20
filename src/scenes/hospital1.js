// Hero

import heroPNG from '../assets/sprites/mentalman.png';
import heroJSON from '../assets/sprites/mentalman.json';

// Objects

import musicOn from '../assets/objects/music-on.png';
import musicOff from '../assets/objects/music-off.png';

// Enemies

import doctorPNG from '../assets/enemies/doctor.png';
import doctorJSON from '../assets/enemies/doctor.json';
import demonPNG from '../assets/enemies/demon-doc.png';
import demonJSON from '../assets/enemies/demon-doc.json';

// Maps
import hospitalCorridorsPNG from '../assets/maps/hospitalCorridors.png'
import hospitalCorridorsJSON from '../assets/maps/hospitalCorridors.json'

// Sound
import backgroundMusic from 'url:../assets/sounds/music/slow-chase.mp3';

let gameOver = false;
const width = 800
const height = 640



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
        this.load.audio('music', backgroundMusic);
        this.load.image('musicOn', musicOn)
        this.load.image('musicOff', musicOff)
        
    }

    create () {            
        this.cursors = this.input.keyboard.createCursorKeys();

        this.music = this.sound.add('music', {loop: true})
        this.music.play()

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

        // SPRITES AREA
        this.hero = this.physics.add.sprite(50, 50, 'hero')
        this.doctor = this.physics.add.sprite(300, 100, 'doctor')
        this.hero.setCollideWorldBounds(true)
        this.doctor.setCollideWorldBounds(true)
        this.hero.setScale(1.5)
        this.doctor.setScale(1.5)

        // LIGHTS CODE TO BE ADDED LATER WHEN OBJECTS CREATED
        // this.hero.setPipeline('Light2D');
        // this.lights.enable();
        // this.lights.setAmbientColor(0x595959);
        // this.lights.addLight(
        //     500, 500
        // )

        // COLLIDERS

        this.physics.add.collider(this.hero, walls)
        this.physics.add.collider(this.hero, this.doctor, function() {
            this.scene.restart()
            gameOver = true
        }, null, this)


        // AUDIO

        console.log(this.music)
        
        this.audioIcon = this.add.image( width - 32 , 32, 'musicOn')

        this.audioIcon.setInteractive().setScale(2.5).on('pointerdown', function() {
            if(this.music.isPlaying) {
                console.log('true')
                this.music.pause();
                this.audioIcon.setTexture('musicOff')
            } else if (this.music.isPaused){
                console.log('false')
                this.music.resume();
                this.audioIcon.setTexture('musicOn')
            }
        }, this)

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
