class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // useful variables
        this.PLATFORM_SPACE = w/4
        this.bkSong = this.sound.add('sfx-song')
        this.bkSong .setVolume(0.5)
        this.i = 0
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
    }

    create() {
        // add background grass
        //this.background = this.add.tileSprite(0, 0, w, h,  'city').setOrigin(0, 0)
        this.room = this.add.tileSprite(0, 0, w, h,  'background').setOrigin(0, 0)
        this.room.setDepth(0)
        
        this. travel = false
        this.elapsedTime =0


        this.tutorial = this.add.sprite(128, h/2 + 90, 'mouse').setScale(2)
        this.tutorial2 = this.add.sprite(202, h/2 + 90, 'arrow').setScale(1.25)

        this.tutorial.play('mouse', true)
        this.tutorial2.play('arrow', true)
        
        this.dart = new Dart(this, w, h/2, 'dart', 0, 20).setOrigin(0,0)

        // add ball
        this.P1 = new Ball(this, 32, h/3, 'ball')
        
        this.platN = new Platform (this, 0, h, 'wall')
        this.platN2 = new Platform (this, this.PLATFORM_SPACE, h, 'wall')
        this.platN3 = new Platform (this, 2*this.PLATFORM_SPACE, h, 'wall')
        this.platN4 = new Platform (this, 3*this.PLATFORM_SPACE, h, 'wall')
        this.platN5 = new Platform (this, 4*this.PLATFORM_SPACE, h, 'wall')
        this.currUI = this.add.text(game.config.width/2- 40, h/15,  'Platforms: 0', scoreConfig)
        this.timerText = this.add.text(10, h/15, 'Time: 0', scoreConfig);
        this.highUI = this.add.text(game.config.width/2+ 192, h/15, 'Hi-Score '+ highScore, scoreConfig);


        // Destroy tutorial on input
        this.input.keyboard.on('keydown', (pointer)=>{
            if (keyLEFT.isDown || keyLEFT2.isDown) {
                this.begin_game()
                
            } else if (keyRIGHT.isDown || keyRIGHT2.isDown) {
                this.begin_game()
            }
        })
        this.input.on('pointerdown', (pointer)=> 
        {
            this.begin_game()
        }, this) 
        
    }

    update() 
    {
        
        /*if(this.travel == true)
        {
            this.background.tilePositionX += 4
        }*/
        if(this.travel)
        {
            this.room.tilePositionX += 12
            
            if(this.i<3)
            {
                this.room.setFrame(this.i)
                
            }
            else
            {
                this.i = 0
                this.room.setFrame(this.i)
            }
        }
        
        this.restart()
        this.dart.update()

        this.P1.update()
        
        // Update the elapsed time
        // Update the timer text
        this.timerText.setText('Time: ' + Math.floor(this.elapsedTime / 1000)); // Convert milliseconds to seconds for display
        this.currUI.setText('Score: '+ passed)
        if(this.travel)
        {
            this.elapsedTime = this.time.now - this.startTime // Increment elapsed time by delta time (time since last frame)
        }
        
        
        console.log(passed)
        

    }

    restart()
    {
        if (Phaser.Input.Keyboard.JustDown( this.input.keyboard.addKey(RKey))) {
            // start next scene
            passed  = 0

            this.scene.stop('playScene');
            this.bkSong.stop()
            this.scene.start('playScene');
        }
    }

    begin_game()
    {
        this.tutorial.destroy()
        this.tutorial2.destroy()
        
        if(this.travel == false)
        {
            this.bkSong.play()
            this.startTime = this.time.now
        }
        
        this.travel = true
        return
    }

}
