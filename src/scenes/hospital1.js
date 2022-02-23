// Hero

import heroPNG from '../assets/sprites/mentalman.png';
import heroJSON from '../assets/sprites/mentalman.json';

// Objects

import musicOn from '../assets/objects/music-on.png';
import musicOff from '../assets/objects/music-off.png';
import pillPNG from '../assets/objects/pill.png';
import pillJSON from '../assets/objects/pill.json';
import boxPNG from '../assets/objects/box.png';
import boxJSON from '../assets/objects/box.json';


// Enemies

import doctorPNG from '../assets/enemies/doctor.png';
import doctorJSON from '../assets/enemies/doctor.json';
import demonPNG from '../assets/enemies/demon-doc.png';
import demonJSON from '../assets/enemies/demon-doc.json';

// Maps
import hospitalCorridorsPNG from '../assets/maps/newhospital.png'
import hospitalCorridorsJSON from '../assets/maps/hospitalCorridors.json'

// Sound
import backgroundMusic from 'url:../assets/sounds/music/slow-chase.mp3';

let gameOver = false;
const width = 800
const height = 640

var line1 = new Phaser.Curves.Line([ 100, 100, 200, 200 ]);

class Hospital1 extends Phaser.Scene
{
    constructor() {
        super({key: "Hospital1" });
  }
    preload () {

        this.load.aseprite('hero', heroPNG, heroJSON)
        this.load.aseprite('doctor', doctorPNG, doctorJSON)
        this.load.image('demon', demonPNG, demonJSON)
        this.load.tilemapTiledJSON('tilemap2', hospitalCorridorsJSON)
		this.load.image('tiles2', hospitalCorridorsPNG)
        this.load.audio('music', backgroundMusic);
        this.load.image('musicOn', musicOn)
        this.load.image('musicOff', musicOff)

        this.load.aseprite('pill', pillPNG, pillJSON)
        this.load.aseprite('box', boxPNG, boxJSON)

    }

    create () {            
        // this.cameras.main.zoom = 0.5;
        
        const map = this.make.tilemap({ key: 'tilemap2', tileWidth: 32, tileHeight: 32})
		const tileset = map.addTilesetImage('newhospital', 'tiles2')
        map.createLayer('Walls', tileset)

        map.createLayer('Ground', tileset)
        map.createLayer('Objects', tileset)

        this.cursors = this.input.keyboard.createCursorKeys();

        this.music = this.sound.add('music', {loop: true})
        this.music.play()

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.anims.createFromAseprite('doctor')
        this.anims.createFromAseprite('box')

        // SPRITES AREA
        this.hero = this.physics.add.sprite(50, 50, 'hero')
        this.doctor = this.physics.add.sprite(300, 100, 'doctor')
        this.pill = this.physics.add.sprite(Phaser.Math.Between(0, width), Phaser.Math.Between(0, height), 'pill')
        this.box = this.physics.add.sprite(height / 2, width /2, 'box') 
        this.box.setScale(2)
        this.hero.setCollideWorldBounds(true)
        this.doctor.setCollideWorldBounds(true)
        this.box.body.setImmovable()
        this.hero.setScale(1.5)
        this.doctor.setScale(1.5)

        this.doctor.setTexture('demon')
        this.hero.immovable = false

        this.demon = this.add.follower(line1, 50, 200, 'demon')
        this.demon.startFollow(4000);

        // LIGHTS CODE TO BE ADDED LATER WHEN OBJECTS CREATED
        // this.hero.setPipeline('Light2D');
        // this.lights.enable();
        // this.lights.setAmbientColor(0x595959);
        // this.lights.addLight(
        //     500, 500
        // )

        // COLLIDERS

        this.physics.add.collider(this.hero, this.pill, function() {
            this.doctor.play('transform', {repeat: 2})
            this.pill.destroy()
        }, null, this)

        this.physics.add.collider(this.hero, this.doctor, function() {
            this.scene.restart()
            gameOver = true
        }, null, this)

        this.physics.add.collider(this.hero, this.box, function() {
            if(this.keyF.isUp) {
                if(this.hero.visible) {
                    this.box.play('open', {repeat: 1})
                    this.hero.setVisible(false)
                    this.hero.immovable = true
                }
                
            }
        }, null, this)



        // AUDIO
        
        this.audioIcon = this.add.image( width - 32 , 32, 'musicOn')

        this.audioIcon.setInteractive().setScale(2.5).on('pointerdown', function() {
            if(this.music.isPlaying) {
                this.music.pause();
                this.audioIcon.setTexture('musicOff')
            } else if (this.music.isPaused){
                this.music.resume();
                this.audioIcon.setTexture('musicOn')
            }
        }, this)
        

    }

    update() {

        // Vertical movement

        if(this.keyW.isDown && this.hero.immovable === false){
            this.hero.setVelocityY(-100)
        } else if(this.keyS.isDown && this.hero.immovable === false) {
            this.hero.setVelocityY(100)
        } else {
            this.hero.setVelocityY(0)
        }

        // Horizontal movement

        if(this.keyA.isDown && this.hero.immovable === false){
            this.hero.setVelocityX(-100)
        } else if(this.keyD.isDown && this.hero.immovable === false) {
            this.hero.setVelocityX(100)
        } else {
            this.hero.setVelocityX(0)
        }

        var dist = Phaser.Math.Distance.BetweenPoints(this.hero, this.doctor);

        if(dist < 100) {
            this.physics.moveToObject( this.doctor, this.hero)
        }
                
        if(!this.hero.visible) {
            if(this.keyF.isDown) {
                this.box.play('open', {repeat: 1})
                this.hero.setVisible(true)
                this.hero.immovable = false
            }
        }
    }
    
}



export default Hospital1;
