// Code Practice: RNGolf
// Name: 
// Date:
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
    width: 640,
    height: 480,
    physics:
    {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: true
        }
    },
    scene: [Load, Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
const paddleWidth = 32;
const paddleHeight = 190;