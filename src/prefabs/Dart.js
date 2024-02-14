// Code obtained from CMPM 120 'Rocket Patrol Tutorial'

class Dart extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture, frame, pointValue)
    {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setDepth(1)
        this.parentScene = scene
        this.points = pointValue
        this.body.allowGravity = false
        this.sfxPop = this.scene.sound.add('sfx-pop')
        this.sfxPop.setVolume(1.5)
        this.setScale(1.5)
        this.setOrigin(0,0)

        
        
        this.scene.input.keyboard.on('keydown', (pointer)=>{
            if (keyLEFT.isDown || keyLEFT2.isDown) {
                if(this.scene.travel == false)
                {
                    this.setVelocityX(-600) 
                }
                 
            } else if (keyRIGHT.isDown || keyRIGHT2.isDown) {
                
                if(this.scene.travel == false)
                {
                    this.setVelocityX(-600) 
                }
            }
        })
        
        this.scene.input.on('pointerdown', (pointer)=> 
        {
            //start the platforms
            //start the parallax animation
            //destroy the turtorial
            if(this.scene.travel == false)
            {
                this.setVelocityX(-600) 
            }
            //this.platGroup.setVelocityX(-100); // Start moving platforms to the left
        }, this)
    }

    reset()
    {
        this.x = game.config.width + 64
        this.y = Phaser.Math.Between(this.parentScene.P1.y, h/3)
        //this.y = this.parentScene.P1.y
    }

    update()
    {
        //this.x -= this.moveSpeed
        this.play('dart', true)
        if(this.x <= -this.width)
        {
            
            setTimeout(this.reset.bind(this), 3000)
            

            //setTimeout(this.alert.destroy.bind(this), 3000)
            //this.alertIN()
            
        }

        if (this.ballCollision()) {
            this.sfxPop.play()
            this.parentScene.bkSong.stop()
            this.parentScene.scene.start('gameOverScene')
            //this.shipExplode(this.dart)
        }
        
    }
    
    alertIN()
    {
        this.alert = this.parentScene.add.sprite(w/2, this.y, 'alertArrow')
        this.alert.anims.play('alert')
        this.alert.setScale(4)
        console.log(this.alert)
        this.alert.on('animationcomplete', () => 
        {
            this.alert.destroy()
        })
        
        /*if(!this.alert.isPlaying)
        {
            this.alert.destroy()     
        */
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


}