class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // useful variables
        this.SHOT_VELOCITY_X = 200
        this.SHOT_VELOCITY_Y_MIN = 700
        this.SHOT_VELOCITY_Y_MAX = 1100
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)
        this.moveSpeed =2

        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.dart = new Dart(this, w/2, h/2, 'dart', 0, 20).setOrigin(0,0)
        this.dart.body.allowGravity = false;


        // add ball
        //height - height/10
        //this.ball = this.physics.add.sprite(width/2, height/10 - 100, 'ball')
        this.ball=this.physics.add.sprite(0,height/3,"ball")

        //sets collision body to circle
        this.ball.body.setCircle(this.ball.width/2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(1.0)
        //this.ball.body.setMass(5)
        //paddle.setDragY(200);
        //paddle.setDepth(1);             // ensures that paddle z-depth remains above shadow paddles
        this.ball.destroyed = false;       // custom property to track paddle life
        this.ball.setBlendMode('SCREEN');  // set a WebGL blend mode
        //this.ball.body.setDamping(true).setDrag(0.5)
        
        // set up barrier group
        this.platGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        // wait a few seconds before spawning barriers
        this.time.delayedCall(1000, () => { 
            this.addPlat(); 
        });

        // add pointer input
        this.ball.setGravityY(50);
        //let square = this.physics.add.sprite(0, height, 'wall'); // Adjust the position as needed
        //square.setImmovable(true); // Make the square immovable
        //square.body.setCollideWorldBounds(true)
        this.input.on('pointerdown', (pointer)=> 
        {
            //let shotDir = pointer.y <= this.ball.y? 1: -1
            // Calculate the direction based on pointer's relative x-position
            //let directionX = pointer.x - this.ball.x;

            // Normalize the direction
            //let length = Math.sqrt(directionX * directionX);
            //directionX /= length;

            // Set the velocity based on the direction
            //this.ball.body.setVelocityX(directionX * 500); // Adjust the speed as needed
            //this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X, this.SHOT_VELOCITY_X))
           this.ball.body.setVelocityY(400)
           this.ball.body.setMass(5)
        })

        // cup/ball collision
        this.physics.add.collider(this.ball, this.platGroup)
        // ball/wall collision
        
        // ball/one-way collision
    }

    // create new platforms and add them to existing platform group
    addPlat() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let platform = new Platform(this, this.platformSpeed - speedVariance);
        this.platGroup.add(platform);
    }

    update() 
    {
        this.dart.play('dart', true)
        this.dart.update() 
        if(this.keyLEFT.isDown )
        {
            //&& this.ball.x >= this.config.width
            //this.ball.setAngularVelocity(-200);
            //this.ball.x -= this.moveSpeed
            this.ball.setVelocityX(-200)
        }
        else if(this.keyRIGHT.isDown )
        {
            //&& this.ball.x <= this.config.width
            //this.ball.setAngularVelocity(200);
            //this.ball.x += this.moveSpeed
            this.ball.setVelocityX(200)
        }
        else
        {
            //DAMP FACTOR is 0.9
            this.ball.setVelocityX(this.ball.body.velocity.x * 0.9)
        }

        //this.physics.world.collide(this.ball, this.platGroup, this.paddleCollision, null, this);
    }


}
