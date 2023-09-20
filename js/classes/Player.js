class Player {
    constructor() {
        this.position = {
            x: 200,
            y: 200
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravityScale = .25

        this.width  = 50
        this.height = 50

        this.sides = {
            top:    this.position.y,
            bottom: this.position.y + this.height,
            left:   this.position.x,
            right:  this.position.x + this.width
        }

        this.color = 'Maroon'
    }

    draw() {
        // Draw Player ->> Canvas
        ctx.fillStyle = player.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    gravity() {
        // Set -> Get Updated Position
        this.position.y  += this.velocity.y;
        this.sides.bottom = this.position.y + this.height;
        // If Airborne -> Apply Gravity
        if (this.sides.bottom + this.velocity.y < canvas.height) {
            this.velocity.y += this.gravityScale
        } else this.velocity.y = 0;
    }

    move() {
        // MOVE LEFT
        if (leftPressed) {
            this.position.x += this.velocity.x;
            this.sides.left = this.position.x;
            if (this.sides.left + this.velocity.x > canvas.x) {
                this.velocity.x = -3.5;
            } else this.velocity.x = 0;
        }
        // MOVE RIGHT
        if (rightPressed) {
            this.position.x += this.velocity.x;
            this.sides.right = this.position.x + this.width;
            if (this.sides.right + this.velocity.x < canvas.x + canvas.width) {
                this.velocity.x = 3.5;
            } else this.velocity.x = 0;
        }
        // JUMP
        if (this.sides.bottom + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
            if (aPressed) {
                this.velocity.y -= 10;
            }
        }
    }

    update() {
        // UPDATE PLAYER POSITION
        player.gravity();
        player.move();

    }
}