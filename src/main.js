// Code Practice: Endless Runner
// Name: Handrei Bohrjah
// Date: 2/12/2024

//Creative Tilt:
/*
    I am mainly proud of my implmentation of the scrolling platforms when the player enters an initial input. 
    Aditionally, I added the missle sprite that had shoots at random heights in order to provide a challenge to the player.
    I also liked my implementation of visual effects because everytime the ball collides witht he platforms, the background changes color.
    I believe that the implementation reduces the performance of the game, but provides a striking visual element to the player. Overall,
    I am satisfied that I was able to implement a physics based runner which relies on a balance of bouncing and pitching back and forth.
*/

/*
<script type="text/javascript" src="./lib/phaser.js"></script>
<script type="text/javascript" src="./src/scenes/Load.js"></script>
<script type="text/javascript" src="./src/scenes/Title.js"></script>
<script type="text/javascript" src="./src/scenes/Play.js"></script>
<script type="text/javascript" src="./src/scenes/GameOver.js"></script>
<script type="text/javascript" src="./src/prefabs/Barrier.js"></script>
<script type="text/javascript" src="./src/main.js"></script>
*/


'use strict'

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    physics:
    {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: [Load, Play, GameOver, Credits ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let passed = 0
let inc = false
let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '32px',
    backgroundColor: '#00FF00',
    color: '#000000',
    align: 'right',
    
  }
let RKey, FKey, keyLEFT, keyLEFT2, keyRIGHT, keyRIGHT2
let highScore = 0
const paddleWidth = 32;
const paddleHeight = 190;
/*
const RKey = Phaser.Input.Keyboard.KeyCodes.R
const keyLEFT = Phaser.Input.Keyboard.KeyCodes.LEFT
const keyLEFT2 = Phaser.Input.Keyboard.KeyCodes.A
const keyRIGHT = Phaser.Input.Keyboard.KeyCodes.RIGHT
const keyRIGHT2 = Phaser.Input.Keyboard.KeyCodes.D*/
