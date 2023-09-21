//------------------------------------------
//-------------- CANVAS SETUP --------------
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.x   =  0;
canvas.y   =  0;

const size    = 64;
canvas.width  = 16 * size + canvas.x; // 1280px;
canvas.height =  9 * size + canvas.y; // 720px;

const collisionBlocks = collisionsLevel1.createObjectsFrom2D()


//---------------------------------------
//------------ CLASS OBJECTS ------------
const backgroundLevel1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/backgroundLevel1.png'
})

const player = new Player({
    collisionBlocks,
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 8,
            loop: true,
            imageSrc: './img/king/idle.png'
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 8,
            loop: true,
            imageSrc: './img/king/idleLeft.png'
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 12,
            loop: true,
            imageSrc: './img/king/runRight.png'
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 12,
            loop: true,
            imageSrc: './img/king/runLeft.png'
        },
    }
})


//-------------------------------------------
//-------------- GAMEPAD SETUP --------------
// let buttonsPressed = [];
let controllerIdx = null;
let upPressed     = false;
let downPressed   = false;
let leftPressed   = false;
let rightPressed  = false;
let aPressed      = false;
let bPressed      = false;
let xPressed      = false;
let yPressed      = false;
let ltPressed     = false;
let rtPressed     = false;


//-------------------------------------------
//---------------- GAME LOOP ----------------
function gameLoop() {
    backgroundLevel1.draw();
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw();
    })
    
    controllerInput();
    if (rightPressed) {
        player.switchSprite('runRight')
        player.velocity.x = 2;
        player.lastDirection = 'right'
    } else if (leftPressed) {
        player.switchSprite('runLeft')
        player.velocity.x = -2;
        player.lastDirection = 'left'
    } else {
        if (player.lastDirection === 'left') player.switchSprite('idleLeft')
        else player.switchSprite('idleRight')
        player.velocity.x = 0;
    }
    player.draw();
    player.update();
    
    window.requestAnimationFrame(gameLoop);
}

gameLoop();