// Hero

import heroPNG from '../assets/sprites/mentalman.png';
import heroJSON from '../assets/sprites/mentalman.json';

// Objects

// Enemies

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

        const map = this.make.tilemap({key: 'hospitalTiles', tileHeight: 32, tileWidth: 32})
        const tileset = map.addTilesetImage('newhospital', 'hospitalImage');
        const floor = map.createLayer('floor', tileset, 400, 300);
        const walls = map.createLayer('walls', tileset, 400, 300);
        const otherwalls = map.createLayer('otherwalls', tileset, 400, 300);

        this.hero = this.physics.add.sprite(50, 50, 'hero')

        this.physics.add.collider(this.hero, floor, function() {
            console.log('collision')
        });

        
    }

    update() {

        // Vertical movement

        if(this.keyW.isDown){
            this.hero.setVelocityY(-100)
        } else if(this.keyS.isDown) {w
            this.hero.setVelocityY(100)
        } else {
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





    }

    
}



export default Hospital1;
