class Player extends Sprite {
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
        super({ imageSrc, frameRate, animations, loop })
        this.position = {
            x: 200,
            y: 200
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.sides = {
            top:    this.position.y,
            bottom: this.position.y + this.height,
            left:   this.position.x,
            right:  this.position.x + this.width
        }

        this.gravityScale = .25

        this.collisionBlocks = collisionBlocks
    }

    update() {
        // BLUE BOX
        // ctx.fillStyle = '#0000FF55';
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.position.x += this.velocity.x;

        this.updateHitbox();

        this.checkForHorizontalCollisions();
        this.applyGravity();

        this.updateHitbox();

        // HITBOX
        // ctx.fillRect(
        //     this.hitbox.position.x,
        //     this.hitbox.position.y,
        //     this.hitbox.width,
        //     this.hitbox.height
        // )
        this.checkForVerticalCollisions();
    }

    handleInput() {
        if (this.preventInput) return
        this.velocity.x = 0
        if (rightPressed) {
            this.switchSprite('runRight')
            this.velocity.x = 2;
            this.lastDirection = 'right'
        } else if (leftPressed) {
            this.switchSprite('runLeft')
            this.velocity.x = -2;
            this.lastDirection = 'left'
        } else {
            if (this.lastDirection === 'left') this.switchSprite('idleLeft')
            else this.switchSprite('idleRight')
        }
        if (upPressed) {
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]
    
                if (this.hitbox.position.x + this.hitbox.width <= door.position.x + door.width &&
                    this.hitbox.position.x >= door.position.x &&
                    this.hitbox.position.y + this.hitbox.height >= door.position.y &&
                    this.hitbox.position.y <= door.position.y + door.height) {
                        this.velocity.x   = 0
                        this.velocity.y   = 0
                        this.preventInput = true
                        this.switchSprite('enterDoor')
                        door.play()
                        return
                }
            }
        }
    }

    switchSprite(name) {
        if (this.image === this.animations[name].image) return
        this.currentFrame     = 0
        this.image            = this.animations[name].image
        this.frameRate        = this.animations[name].frameRate
        this.frameBuffer      = this.animations[name].frameBuffer
        this.loop             = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width: 50,
            height: 53
        }
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            
            // If Collision 
            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width  >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                // Left Side
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
                    break
                }
                // Right Side
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    break
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravityScale;
        this.position.y += this.velocity.y;
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            
            // If Collision
            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width  >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                // Top Side
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    break
                }
                // Bottom Side
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    if (aPressed) {
                        this.velocity.y = -8;
                    }
                    break
                }
            }
        }
    }
}