//------------------------------------------
//-------------- CANVAS SETUP --------------
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.x   =  0;
canvas.y   =  0;

const size    = 64;
canvas.width  = 16 * size + canvas.x; // 1280px;
canvas.height =  9 * size + canvas.y; // 720px;

let collisionBlocks
let levelBG
let doors
const player = new Player({
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
        enterDoor: {
            frameRate: 8,
            frameBuffer: 22,
            loop: false,
            imageSrc: './img/king/enterDoor.png',
            onComplete: () => {
                console.log('completed animation')
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 1.25,
                    onComplete: () => {
                        level++
                        if (level === 4) level = 1
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            }
        }
    }
})

let level  = 1
let levels = {
    1: {
        init: () => {
            collisionBlocks = collisionsLevel1.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks

            if (player.currentAnimation) player.currentAnimation.isActive = false

            levelBG = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel1.png'
            })

            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 25,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },

    2: {
        init: () => {
            collisionBlocks = collisionsLevel2.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 140

            if (player.currentAnimation) player.currentAnimation.isActive = false

            levelBG = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel2.png'
            })

            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 336
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 25,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },

    3: {
        init: () => {
            collisionBlocks = collisionsLevel3.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 750
            player.position.y = 240

            if (player.currentAnimation) player.currentAnimation.isActive = false

            levelBG = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel3.png'
            })

            doors = [
                new Sprite({
                    position: {
                        x: 176,
                        y: 334
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 25,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    }
}


//---------------------------------------
//------------ CLASS OBJECTS ------------



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

const overlay = {
    opacity: 0
}
//-------------------------------------------
//---------------- GAME LOOP ----------------
function gameLoop() {

    levelBG.draw();
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw();
    })

    doors.forEach(door => {
        door.draw();
    })
    
    controllerInput();
    player.handleInput();
    player.draw();
    player.update();
    
    ctx.save()
    ctx.globalAlpha = overlay.opacity
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.restore()
    window.requestAnimationFrame(gameLoop);
}

levels[level].init()
gameLoop();