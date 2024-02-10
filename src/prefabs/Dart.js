// Code obtained from CMPM 120 'Rocket Patrol Tutorial'

class Dart extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture, frame, pointValue)
    {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.parentScene = scene
        this.points = pointValue
        this.moveSpeed = 4
        this.body.allowGravity = false;
    }

    update()
    {
        this.x -= this.moveSpeed
        if(this.x <= 0 - this.width)
        {
            this.x = game.config.width
        }

        if (this.ballCollision()) {
            this.parentScene.scene.start('gameOverScene')
            //this.shipExplode(this.dart)
        }
        
    }

    ballCollision() 
    {
        if (this.parentScene.P1.x < this.x + this.width && 
            this.parentScene.P1.x + this.parentScene.P1.width > this.x && 
            this.parentScene.P1.y < this.y + this.height &&
            this.parentScene.P1.height + this.parentScene.P1.y > this. y) {
                return true;
        } else {
            return false;
        }
    }

    reset()
    {
        this.x = game.config.width
    }
}