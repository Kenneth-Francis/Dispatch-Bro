const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.x   =  0;
canvas.y   =  0;

const size    = 64;
canvas.width  = 16 * size + canvas.x; // 1280px;
canvas.height =  9 * size + canvas.y; // 720px;

// CONTROLLER DEFINITIONS
let buttonsPressed = [];
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

function controllerInput() {
    if (controllerIdx !== null) {
        const gamepad = navigator.getGamepads()[controllerIdx];

        const buttons = gamepad.buttons;
        upPressed     = buttons[12].pressed;
        downPressed   = buttons[13].pressed;
        leftPressed   = buttons[14].pressed;
        rightPressed  = buttons[15].pressed;
        aPressed      = buttons[0].pressed;
        bPressed      = buttons[1].pressed;
        xPressed      = buttons[2].pressed;
        yPressed      = buttons[3].pressed;
        ltPressed     = buttons[6].pressed;
        rtPressed     = buttons[7].pressed;

        const stickDeadZone = 0.8;

        const leftRightValue = gamepad.axes[0];
        if (leftRightValue >= stickDeadZone) {
            rightPressed = true;
        } else if (leftRightValue <= -stickDeadZone) {
            leftPressed = true;
        }

        const upDownValue = gamepad.axes[1];
        if (upDownValue >= stickDeadZone) {
            downPressed = true;
        } else if (upDownValue <= -stickDeadZone) {
            upPressed = true;
        }
    }
}

//---------------------------------------
//------------ CLASS OBJECTS ------------

const backgroundLevel1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/backgroundLevel1.png'
})

const player = new Player()

function gameLoop() {
    backgroundLevel1.draw();
    
    controllerInput();
    player.draw();
    player.update();
    
    window.requestAnimationFrame(gameLoop);
}

gameLoop();