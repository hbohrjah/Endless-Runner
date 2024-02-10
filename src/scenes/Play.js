class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // useful variables
        this.SHOT_VELOCITY_X = 200
        this.SHOT_VELOCITY_Y_MIN = 700
        this.SHOT_VELOCITY_Y_MAX = 1100
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)
        this.moveSpeed =2
        
        this.dart = new Dart(this, w/2, h/2, 'dart', 0, 20).setOrigin(0,0)

        // add ball
        this.P1 = new Ball(this, 0, height/3, 'ball')
        
        this.platN = new Platform (this, 0, height, 'wall')
        //this.defaultPad.setCollideWorldBounds()
        //this.defaultPad.setImmovable()
        

        this.platGroup = this.physics.add.group({
            defaultKey: 'wall',
            maxSize: 6, // Maximum number of platforms
            runChildUpdate: true // Allow updating individual platforms
        })

        this.input.on('pointerdown', (pointer)=> 
        {
            //start the platforms
            //start the parallax animation
            //destroy the turtorial

           this.platGroup.setVelocityX(-100); // Start moving platforms to the left
        }, this)
    }

    update() 
    {
        this.dart.play('dart', true)
        this.dart.update() 
        this.P1.update()
    }
    
    spawnPlatform() {
        const platform = this.platGroup.create(
            w , // Start from the right
            h, // Bottom of the screen
            'wall'
          )
          platform.body.allowGravity = false;
          platform.setImmovable()
          platform.setOrigin(1, 1); // Set origin to bottom right
          platform.setVelocityX(-100); // Move towards the left
          platform.setDepth(1); // Ensure platforms are above other game elements
        
    }

}
