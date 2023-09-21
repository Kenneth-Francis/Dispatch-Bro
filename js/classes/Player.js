class Player {
    constructor({ collisionBlocks = [] }) {
        this.position = {
            x: 200,
            y: 200
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.width  = 50
        this.height = 50
        this.sides = {
            top:    this.position.y,
            bottom: this.position.y + this.height,
            left:   this.position.x,
            right:  this.position.x + this.width
        }

        this.gravityScale = .25

        this.collisionBlocks = collisionBlocks
    }

    draw() {
        // Draw Player ->> Canvas
        ctx.fillStyle = 'Maroon'
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update() {
        this.position.x += this.velocity.x;

        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.checkForVerticalCollisions();
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            
            // If Collision 
            if (
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width  >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                // Left Side
                if (this.velocity.x < 0) {
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                    break
                }
                // Right Side
                if (this.velocity.x > 0) {
                    this.position.x = collisionBlock.position.x - this.width - 0.01;
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
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width  >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                // Top Side
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                    break
                }
                // Bottom Side
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - 0.01;
                    if (aPressed) {
                        player.velocity.y = -10;
                    }
                    break
                }
            }
        }
    }
}